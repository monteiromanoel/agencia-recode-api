import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from "next/link";

const ViewClient = () => {
    const [client, setClient] = useState({
        nome: "",
        email: "",
        senha: "",
        logradouro: "",
        cep: "",
        cidade: "",
        uf: "",
        telefone: "",
        documento: "",
        dia: "",
        mes: "",
        ano: ""
    });
    const router = useRouter();
    const { codigo, source } = router.query;
    

    useEffect(() => {
        if (codigo) {
            axios.get(`https://localhost:7079/api/Clientes/${codigo}`)
                .then((response) => {
                    setClient(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar detalhes do usuário:", error);
                });
        }
    }, [codigo]);

    return (
        <main className="container col pt-2 pb-4">
            <h1>
                Dados de
                <span className="text-info mx-2">
                    {client.nome}
                </span>
            </h1>
            <hr />
            <div className="col-lg-8 mx-auto">
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Id </p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                    {client.clienteId}
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Nome Completo</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                    {client.nome}
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Email</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                    {client.email}
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Telefone</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                    {client.telefone}
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Endereço</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                    {client.logradouro} - CEP: {client.cep}. {client.cidade}/{client.uf}
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Documento</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                    {client.documento}
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Data de Nascimento</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                    {new Date(client.dataNasc).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center gap-2">
                <Link href={'/cliente/PageClientes'} className="btn text-white btn-lg btn-link">Voltar</Link>
                <Link href={`../update-client/${client.clienteId}`} className="btn btn-lg btn-info">Editar</Link>
            </div>
        </main>

    );
};

export default ViewClient;