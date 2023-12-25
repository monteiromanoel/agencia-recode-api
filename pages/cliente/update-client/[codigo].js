import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import InputMask from "react-input-mask";
import Link from "next/link";

const UpdateClient = () => {
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
    const { codigo } = router.query;

    useEffect(() => {
        if (codigo) {

            axios.get(`https://localhost:7079/api/Clientes/${codigo}`)
                .then((response) => {
                    const { dataNasc } = response.data;
                    const date = new Date(dataNasc);
                    setClient({
                        ...response.data,
                        dia: date.getDate().toString(),
                        mes: (date.getMonth() + 1).toString(), 
                        ano: date.getFullYear().toString()
                    });
                })
                .catch((error) => {
                    console.error("Erro ao buscar detalhes do usuário:", error);
                });
        }
    }, [codigo]);

    const handleInputChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleUpdateClient = () => {
        const { dia, mes, ano, ...rest } = client;
        const combinedDate = new Date(`${ano}-${mes}-${dia}`);
        combinedDate.setHours(0, 0, 0, 0);

        const formattedDate = combinedDate.toISOString().split('T')[0];

        const updatedClient = {
            ...rest,
            dataNasc: formattedDate
        };

        axios.put(`https://localhost:7079/api/Clientes/${client.id}`, updatedClient)
            .then((response) => {
                router.push('/cliente/PageClientes');
            })
            .catch((error) => {
                console.error("Erro ao atualizar cliente:", error);
            });
    };

    return (
        <div className="container conteudo">
            <main className="col pt-2 pb-4">
                <h1 className="text-center">Editar Cliente</h1>
                <hr></hr>
                <div className="d-flex flex-row align-items-center mb-4">
                    <input
                        type="hidden"
                        name="id"
                        value={client.id = codigo}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="nomeCliente">
                            Nome
                        </label>{" "}
                        <input
                            type="text"
                            id="nomeCliente"
                            className="form-control"
                            name="nome"
                            value={client.nome}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="emailCliente">
                            E-mail
                        </label>{" "}
                        <input
                            type="text"
                            id="emailCliente"
                            className="form-control"
                            name="email"
                            value={client.email}
                            onChange={handleInputChange}
                            required

                        />
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="senhaCliente">
                            Senha
                        </label>{" "}
                        <input
                            type="password"
                            className="form-control"
                            name="senha"
                            value={client.senha}
                            onChange={handleInputChange}
                            placeholder="********"
                            required
                        />
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="logradouroCliente">
                            Endereço:
                        </label>{" "}
                        <input
                            type="text"
                            id="logradouroCliente"
                            className="form-control"
                            name="logradouro"
                            value={client.logradouro}
                            onChange={handleInputChange}
                            placeholder="Logradouro e Número"
                            required
                        />
                        <div className="d-flex flex-row align-items-center my-2">
                            <InputMask
                                mask="99999-999"
                                maskChar="_"
                                type="text"
                                id="cepCliente"
                                className="form-control"
                                name="cep"
                                value={client.cep}
                                onChange={handleInputChange}
                                placeholder="_____-___"
                                required
                            />
                            {" "}
                            <input
                                type="text"
                                id="cidadeCliente"
                                className="form-control w-50 mx-2"
                                name="cidade"
                                value={client.cidade}
                                onChange={handleInputChange}
                                placeholder="Cidade"
                                required
                            />{" "}
                            <select
                                id="estado"
                                className="form-control form-select w-25"
                                name="uf" value={client.uf}
                                onChange={handleInputChange}
                            >
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                                <option value="EX">Estrangeiro</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center gap-3 mb-4">
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="telefoneCliente">
                            Telefone
                        </label>
                        <InputMask
                            mask="(99) 99999-9999"
                            maskChar="_"
                            type="text"
                            id="telefoneCliente"
                            className="form-control"
                            name="telefone"
                            value={client.telefone}
                            onChange={handleInputChange}
                            placeholder="(__) _____-____"
                            required
                        />
                    </div>
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="documentoCliente">
                            Documento
                        </label>
                        <InputMask
                            mask="999.999.999-99"
                            maskChar="_"
                            type="text"
                            id="documentoCliente"
                            className="form-control"
                            name="documento"
                            value={client.documento}
                            onChange={handleInputChange}
                            placeholder="___.___.___-__"
                            required
                        />
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center gap-3 mb-4">
                    <fieldset>
                        <legend className="w-auto fs-5">Data de Nascimento</legend>
                        <div className="d-flex flex-row gap-2 align-items-center">
                            <div className="form-outline flex-fill">
                                <label className="form-label" htmlFor="dia">
                                    Dia
                                </label>{" "}
                                <input
                                    type="number"
                                    id="dia"
                                    className="form-control"
                                    name="dia"
                                    value={client.dia}
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
                                    id="mes"
                                    className="form-control"
                                    name="mes"
                                    value={client.mes}
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
                                    id="ano"
                                    className="form-control"
                                    name="ano"
                                    value={client.ano}
                                    onChange={handleInputChange}
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    required
                                />
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <Link href={'/cliente/PageClientes'} className="btn text-white btn-lg btn-link">Voltar</Link>
                    <button onClick={handleUpdateClient} className="btn btn-primary btn-lg">
                        Atualizar Cadastro
                    </button>
                </div>
            </main>
        </div>

    );
};

export default UpdateClient;