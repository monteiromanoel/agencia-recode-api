import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from "next/link";
import { Editor } from '@tinymce/tinymce-react';

const UpdateDestino = () => {
    const [Destino, setDestino] = useState({
        id: "",
        destino: "",
        localidade: "",
        preco: "",
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

    useEffect(() => {
        if (codigo) {
            setDestino((prevState) => ({
                ...prevState,
                id: codigo
            }));

            axios.get(`https://localhost:7079/api/Destinos/${codigo}`)
                .then((response) => {
                    const { data_ida } = response.data;
                    const dateIda = new Date(data_ida);
                    const { data_volta } = response.data;
                    const dateVolta = new Date(data_volta);
                    setDestino({
                        ...response.data,
                        diaIda: dateIda.getDate().toString(),
                        mesIda: (dateIda.getMonth() + 1).toString(),
                        anoIda: dateIda.getFullYear().toString(),
                        diaVolta: dateVolta.getDate().toString(),
                        mesVolta: (dateVolta.getMonth() + 1).toString(),
                        anoVolta: dateVolta.getFullYear().toString(),

                    });
                })
                .catch((error) => {
                    console.error("Erro ao buscar detalhes do usuário:", error);
                });
        }
    }, [codigo]);

    const handleInputChange = (e) => {
        setDestino({ ...Destino, [e.target.name]: e.target.value });
    };


    const handleDescricaoLongaChange = (content, editor) => {
        setDestino({ ...Destino, descricao_longa: content });
    };

    const handleUpdateDestino = () => {
        const { diaIda, mesIda, anoIda, diaVolta, mesVolta, anoVolta, ...rest } = Destino;
        
        const combinedDateIda = new Date(`${anoIda}-${mesIda}-${diaIda}`);

        const combinedDateVolta = new Date(`${anoVolta}-${mesVolta}-${diaVolta}`);

        const precoDecimal = parseFloat(Destino.preco);
        const precoAntDecimal = parseFloat(Destino.preco_antigo);

        const updatedDestino = {
            ...rest,
            data_ida: combinedDateIda,
            data_volta: combinedDateVolta,
            preco: precoDecimal,
            preco_antigo: precoAntDecimal
        };

        Object.keys(updatedDestino).forEach((key) => {
            if (updatedDestino[key] === '') {
                updatedDestino[key] = null;
            }
        });

        console.log(JSON.stringify(updatedDestino, null, 2));

        axios.put(`https://localhost:7079/api/Destinos/${Destino.id}`, updatedDestino)
            .then((response) => {
                router.push('/destino/PageDestinos');
            })
            .catch((error) => {
                console.error("Erro ao atualizar destino:", error);
            });
    };



    return (
        <div className="container conteudo">
            <main className="col pt-2 pb-4">
                <h1 className="text-center">Edição de Destino</h1>
                <hr></hr>
                <>
                    <div className="d-flex flex-row flex-wrap align-items-center gap-1 mb-4 mt-3">
                        <div className="form-outline flex-fill mx-1 mb-0">
                            <input
                            type="hidden"
                            name="id"
                            value={Destino.id = codigo}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                            <label className="form-label" htmlFor="destino">
                                Destino
                            </label>{" "}
                            <input
                                type="text"
                                id="destino"
                                className="form-control"
                                name="destino"
                                placeholder="Insira um destino"
                                value={Destino.destino}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-outline flex-fill mb-2 mt-2">
                            <label className="form-label" htmlFor="localidade">
                                País ou Localidade
                            </label>{" "}
                            <input
                                type="text"
                                id="localidade"
                                className="form-control"
                                name="localidade"
                                placeholder="Insira o país ou localidade"
                                value={Destino.localidade}
                                onChange={handleInputChange}
                                required=""
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-wrap justify-content-evenly mb-4 mt-3">
                        <fieldset className="justify-content-start">
                            <legend className="w-auto fs-5">Data de Ída</legend>
                            <div className="d-flex flex-row gap-2 align-items-center">
                                <div className="form-outline flex-fill">
                                    <label className="form-label" htmlFor="dia">
                                        Dia
                                    </label>{" "}
                                    <input
                                        type="number"
                                        id="diaIda"
                                        className="form-control"
                                        name="diaIda"
                                        value={Destino.diaIda}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="31"
                                        required
                                    />
                                </div>
                                <div className="form-outline flex-fill">
                                    <label className="form-label" htmlFor="mes">
                                        Mês
                                    </label>{" "}
                                    <input
                                        type="number"
                                        id="mesIda"
                                        className="form-control"
                                        name="mesIda"
                                        value={Destino.mesIda}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="12"
                                        required
                                    />
                                </div>
                                <div className="form-outline flex-fill">
                                    <label className="form-label" htmlFor="ano">
                                        Ano
                                    </label>{" "}
                                    <input
                                        type="number"
                                        id="anoIda"
                                        className="form-control"
                                        name="anoIda"
                                        value={Destino.anoIda}
                                        onChange={handleInputChange}
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        required
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="w-auto fs-5">Data de Volta</legend>
                            <div className="d-flex flex-row gap-2 align-items-center">
                                <div className="form-outline flex-fill">
                                    <label className="form-label" htmlFor="dia">
                                        Dia
                                    </label>{" "}
                                    <input
                                        type="number"
                                        id="diaVolta"
                                        className="form-control"
                                        name="diaVolta"
                                        value={Destino.diaVolta}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="31"
                                        required
                                    />
                                </div>
                                <div className="form-outline flex-fill">
                                    <label className="form-label" htmlFor="mes">
                                        Mês
                                    </label>{" "}
                                    <input
                                        type="number"
                                        id="mesVolta"
                                        className="form-control"
                                        name="mesVolta"
                                        value={Destino.mesVolta}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="12"
                                        required
                                    />
                                </div>
                                <div className="form-outline flex-fill">
                                    <label className="form-label" htmlFor="ano">
                                        Ano
                                    </label>{" "}
                                    <input
                                        type="number"
                                        id="anoVolta"
                                        className="form-control"
                                        name="anoVolta"
                                        value={Destino.anoVolta}
                                        onChange={handleInputChange}
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        required
                                    />
                                </div>
                            </div>
                        </fieldset>

                    </div>
                    <div className="d-flex flex-row flex-wrap align-items-center gap-1 mb-4 mt-3">
                        <div className="form-outline flex-fill mx-1 mb-0">
                            <label className="form-label" htmlFor="adicional">
                                Adicional
                            </label>
                            <input
                                type="text"
                                id="adicional"
                                className="form-control"
                                name="adicional"
                                value={Destino.adicional}
                                onChange={handleInputChange}
                                maxLength={90}
                                required=""
                            />
                        </div>
                        <div className="form-outline flex-fill mx-1 mb-0">
                            <label className="form-label" htmlFor="tipo_pacote">
                                Tipo do Pacote{" "}
                            </label>{" "}
                            <select id="tipo_pacote" className="form-control form-select" name="tipo_pacote" value={Destino.tipo_pacote} onChange={handleInputChange}>
                                <option value="promocional">promocional</option>
                                <option value="convencional">convencional</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-1 mb-4">
                        <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="textAreaCurta">
                                Descrição Curta:{" "}
                            </label>
                            <textarea
                                id="textAreaCurta"
                                name="descricao_curta"
                                className="form-control"
                                maxLength={300}
                                placeholder="Insira uma descrição curta"
                                value={Destino.descricao_curta}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="descricao_longa">
                                Descrição Longa:{" "}
                            </label>
                            <Editor
                                id="editor"
                                apiKey="8svz9148gua03293my7b0e5drfls3zdv5h5b52vt4dbntdgt"
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                }}
                                value={Destino.descricao_longa}
                                onEditorChange={handleDescricaoLongaChange}
                            />


                        </div>
                    </div>
                    <div className="container mb-4">
                        <fieldset className="border rounded-3 p-3 d-flex flex-row flex-wrap justify-content-center align-items-center">
                            <legend className="float-none fs-6 w-auto px-3 bg-secondary rounded shadow-sm py-2">
                                Área exclusiva para pacotes{" "}
                                <span className="text-white bg-danger rounded p-1">PROMOCIONAIS</span>
                            </legend>
                            <div className="row justify-content-center mb-4">
                                <div className="row">
                                    <div className="col-8">
                                        <label className="form-label" htmlFor="labelPromocao">
                                            Etiqueta de Promoção
                                        </label>{" "}
                                        <input
                                            type="text"
                                            id="labelPromocao"
                                            className="form-control"
                                            name="label_promocao"
                                            placeholder="Texto da etiqueta"
                                            value={Destino.label_promocao}
                                            onChange={handleInputChange}
                                            maxLength={40}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label className="form-label" htmlFor="precoAntigo">
                                            Preço Antigo
                                        </label>{" "}
                                        <input
                                            type="text"
                                            id="precoAntigo"
                                            className="form-control"
                                            value={Destino.preco_antigo}
                                            onChange={handleInputChange}
                                            name="preco_antigo"
                                            placeholder="0,00"
                                        />
                                        <p className="blockquote-footer text-white mt-2">
                                            Esse valor aparece assim:
                                            <del> R$2000,00</del>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="d-flex flex-row justify-content-center align-items-center mx-auto mb-4">
                        <div className="d-flex form-outline justify-content-center align-items-center flex-fill mb-0">
                            <label className="form-label mx-2" htmlFor="preco">
                                Preço Final:
                            </label>{" "}
                            <input
                                type="text"
                                id="preco"
                                className="form-control w-50"
                                name="preco"
                                value={Destino.preco}
                                onChange={handleInputChange}
                                placeholder="0,00"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>
                    <h4>Imagens</h4>
                    <div className="d-flex flex-row flex-wrap align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0 w-50 mx-1">
                            <label className="form-label" htmlFor="imagem">
                                Imagem de Capa (*)
                            </label>{" "}
                            <input
                                type="text"
                                id="imagem"
                                className="form-control"
                                name="imagem"
                                placeholder="Adicione o link da imagem"
                                value={Destino.imagem}
                                onChange={handleInputChange}
                                required=""
                            />
                            <label className="form-label" htmlFor="imagem2">
                                Imagem 2
                            </label>
                            <input
                                type="text"
                                id="imagem2"
                                className="form-control"
                                name="imagem2"
                                value={Destino.imagem2}
                                onChange={handleInputChange}
                                placeholder="Adicione o link da imagem"
                            />
                        </div>
                        <div className="form-outline flex-fill mb-0 w-50 mx-1">
                            <label className="form-label" htmlFor="imagem3">
                                Imagem 3
                            </label>
                            <input
                                type="text"
                                id="imagem3"
                                className="form-control"
                                name="imagem3"
                                value={Destino.imagem3}
                                onChange={handleInputChange}
                                placeholder="Adicione o link da imagem"
                            />{" "}
                            <label className="form-label" htmlFor="imagem4">
                                Imagem 4
                            </label>{" "}
                            <input
                                type="text"
                                id="imagem4"
                                className="form-control"
                                name="imagem4"
                                value={Destino.imagem4}
                                onChange={handleInputChange}
                                placeholder="Adicione o link da imagem"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <Link href={'/destino/PageDestinos'} className="btn text-white btn-lg btn-link">Voltar</Link>
                    <button onClick={handleUpdateDestino} className="btn btn-primary btn-lg">
                        Atualizar Cadastro
                    </button>
                </div>
                </>

            </main>
        </div>

    );
};

export default UpdateDestino;