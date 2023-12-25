import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from "next/link";

const ViewDestino = () => {
    const [Destino, setDestino] = useState({
        destino: "",
        localidade: "",
        preco: 0,
        descricao_curta: "",
        descricao_longa: "",
        tipo_pacote: "",
        adicional: "",
        imagem: "",
        diaIda: "",
        mesIda: "",
        anoIda: "",
        diaVolta: "",
        mesVolta: "",
        anoVolta: "",
        imagem2: "",
        imagem3: "",
        imagem4: "",
        label_promocao: "",
        preco_antigo: 0
    });
    const router = useRouter();
    const { codigo } = router.query;

    const renderTipoPacote = (tipoPacote) => {
        if (tipoPacote === 'convencional') {
            return (
                <span className="bg-info text-white px-2 py-1 rounded">
                    {tipoPacote}
                </span>
            );
        } else if (tipoPacote === 'promocional') {
            return (
                <span className="bg-danger text-white px-2 py-1 rounded">
                    {tipoPacote}
                </span>
            );
        } else {
            return tipoPacote;
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const handleImageError = (event) => {
        event.target.src = 'https://fakeimg.pl/350x200/?text=Imagem Desconhecida';
    };

    useEffect(() => {
        if (codigo) {
            axios.get(`https://localhost:7079/api/Destinos/${codigo}`)
                .then((response) => {
                    setDestino(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar detalhes do destino:", error);
                });
        }
    }, [codigo]);

    return (
        <div className="container-fluid mb-3 conteudo">
            <main className="col pt-2 pb-4">
                <h1>Dados do Destino</h1>
                <hr />
                <div className="col-lg-8 mx-auto">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">ID</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        {Destino.destinoId}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Destino</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        {Destino.destino} - {Destino.localidade}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Data de Ida</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        <span className="dataConvert">
                                            {new Date(Destino.data_ida).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Data de Volta</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        <span className="dataConvert">
                                            {new Date(Destino.data_volta).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Descrição Curta</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        {Destino.descricao_curta}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Descrição Longa</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: Destino.descricao_longa }}>
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Tipo do Pacote</p>
                                </div>
                                <div className="col-sm-9">
                                    {renderTipoPacote(Destino.tipo_pacote)}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Preço</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        {formatCurrency(Destino.preco)}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row border rounded shadow-sm p-1">
                                <legend className="text-muted alert alert-danger text-center">Área Promocional</legend>
                                <div className="col-sm-3 mb-2">
                                    <p className="mb-0">Preço Antigo</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        <span className="text-decoration-line-through">{formatCurrency(Destino.preco_antigo)}</span>
                                    </p>
                                </div>
                                <div className="col-sm-3">
                                    <p className="mb-0">Etiqueta Promocional</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        {Destino.label_promocao}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center my-3">
                    <div
                        id="carouselExampleControls"
                        className="carousel slide w-50"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                {Destino.imagem ? (
                                    <img
                                        src={Destino.imagem}
                                        className="d-block w-100 img-fluid"
                                        alt="Imagem 1"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://fakeimg.pl/350x200/?text=Imagem Desconhecida';
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="https://fakeimg.pl/350x200/?text=Imagem Desconhecida"
                                        className="d-block w-100 img-fluid"
                                        alt="Imagem Padrão"
                                    />
                                )}
                            </div>
                            <div className="carousel-item">
                            {Destino.imagem2 ? (
                                    <img
                                        src={Destino.imagem2}
                                        className="d-block w-100 img-fluid"
                                        alt="Imagem 2"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://fakeimg.pl/350x200/?text=Imagem Desconhecida';
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="https://fakeimg.pl/350x200/?text=Imagem Desconhecida"
                                        className="d-block w-100 img-fluid"
                                        alt="Imagem Padrão"
                                    />
                                )}
                            </div>
                            <div className="carousel-item">
                            {Destino.imagem3 ? (
                                    <img
                                        src={Destino.imagem3}
                                        className="d-block w-100 img-fluid"
                                        alt="Imagem 3"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://fakeimg.pl/350x200/?text=Imagem Desconhecida';
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="https://fakeimg.pl/350x200/?text=Imagem Desconhecida"
                                        className="d-block w-100 img-fluid"
                                        alt="Imagem Padrão"
                                    />
                                )}
                            </div>
                            <div className="carousel-item">
                            {Destino.imagem4 ? (
                                    <img
                                        src={Destino.imagem4}
                                        className="d-block w-100 img-fluid"
                                        alt="Imagem 4"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://fakeimg.pl/350x200/?text=Imagem Desconhecida';
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="https://fakeimg.pl/350x200/?text=Imagem Desconhecida"
                                        className="d-block w-100 img-fluid"
                                        alt="Imagem Padrão"
                                    />
                                )}
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleControls"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleControls"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div className="d-flex justify-content-center my-3">
                    <Link href={'/destino/PageDestinos'} className="btn text-white btn-lg btn-link">Voltar</Link>
                    <Link href={`../update-destino/${Destino.destinoId}`} className="btn btn-lg btn-info">Editar</Link>
                </div>
            </main>
        </div>

    );
};

export default ViewDestino;