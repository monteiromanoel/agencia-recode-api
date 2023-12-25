import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from "next/link";

const ViewReserva = () => {
    const [reserva, setReserva] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [destino, setDestino] = useState([]);

    const router = useRouter();
    const { codigo } = router.query;

    useEffect(() => {
        if (codigo) {
            axios.get(`https://localhost:7079/api/Reservas/${codigo}`)
                .then((response) => {
                    setReserva(response.data);
    
                    axios.get(`https://localhost:7079/api/Clientes/${response.data.clienteId}`)
                        .then((clienteResponse) => {
                            setCliente(clienteResponse.data);
                        })
                        .catch((error) => {
                            console.error("Erro ao buscar detalhes do cliente:", error);
                        });
    
                    axios.get(`https://localhost:7079/api/Destinos/${response.data.destinoId}`)
                        .then((destinoResponse) => {
                            setDestino(destinoResponse.data);
                        })
                        .catch((error) => {
                            console.error("Erro ao buscar detalhes do destino:", error);
                        });
                })
                .catch((error) => {
                    console.error("Erro ao buscar detalhes da reserva:", error);
                });
        }
    }, [codigo]);
    

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    return (
        <div className="container-fluid mb-3 conteudo">
            <main className="col pt-2 pb-4">

                <h1>Dados da Reserva</h1>
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
                                        {reserva.reservaId}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Cliente</p>
                                </div>
                                <div className="col-sm-9">

                                    <p className="text-muted mb-0">
                                        {reserva.clienteId} - {cliente.nome}
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
                                        {reserva.destinoId} - {destino.destino} / {destino.localidade}
                                    </p>

                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Data da Reserva</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        <span className="dataConvert">
                                            {new Date(reserva.dataReserva).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Número de Passageiros</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        {reserva.numPassageiros}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Valor Final</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                        {formatCurrency(reserva.preco)}
                                    </p>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center my-3">
                    <Link href={'/reserva/PageReservas'} className="btn text-white btn-lg btn-link">Voltar</Link>
                </div>
            </main>
        </div>

    );
};

export default ViewReserva;