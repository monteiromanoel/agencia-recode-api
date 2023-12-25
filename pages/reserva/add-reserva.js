import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';

const AddReserva = () => {
    const [clients, setClients] = useState([]);
    const [destinos, setDestinos] = useState([]);

    const [newReserva, setNewReserva] = useState({
        numPassageiros: "",
        dataReserva: "",
        preco: "",
        clienteId: "",
        destinoId: ""
    });

    useEffect(() => {
        axios
            .get("https://localhost:7079/api/Clientes")
            .then((response) => {
                setClients(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar a lista de clientes:", error);
            });

        axios
            .get("https://localhost:7079/api/Destinos")
            .then((response) => {
                setDestinos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar a lista de clientes:", error);
            });
    }, []);
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReserva({ ...newReserva, [name]: value });
        console.log('Novo valor do input:', name, value);
        { "setNewReserva({ ...newReserva, [e.target.name]: e.target.value }); " }
    };

    const handleAddReserva = () => {
        const clienteId = parseInt(newReserva.clienteId);
        const destinoId = parseInt(newReserva.destinoId);
        const numPassageiros = parseInt(newReserva.numPassageiros);

        const destinoSelecionado = destinos.filter(destino => destino.destinoId === parseInt(destinoId, 10));

         const clienteSelecionado = clients.filter(cliente => cliente.clienteId === parseInt(clienteId, 10));

        console.log('Destinos:', destinos);
        console.log('Destino ID:', destinoId);
        console.log('Pass:', numPassageiros);
        console.log('Destino Selecionado:', destinoSelecionado);

        if (destinoSelecionado.length > 0) {
            const destino = destinoSelecionado[0];
            console.log('Preço do Destino:', destino.preco);

            const precoDestino = parseFloat(destino.preco);
            const precoTotal = precoDestino * numPassageiros;

            const dataAtual = new Date();

            const dadosReserva = {
                clienteId,
                destinoId,
                numPassageiros,
                preco: precoTotal,
                dataReserva: dataAtual.toISOString(),
            };

            console.log(JSON.stringify(dadosReserva, null, 2));

            axios
                .post("https://localhost:7079/api/Reservas", dadosReserva)
                .then((response) => {
                    router.push("/reserva/PageReservas");
                })
                .catch((error) => {
                    alert("Erro ao criar reserva:" + error);
                });
        } else {
            console.error('Destino não encontrado.');
        }
    };

    return (

        <div className="container conteudo">
            <main className="col pt-2 pb-4">
                <h1 className="mb-4"> <FontAwesomeIcon
                    icon={faSuitcaseRolling} /> Cadastrar Nova Reserva</h1>
                <hr></hr>

                <div className="d-flex flex-row align-items-center gap-2 mb-4">
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="nomeCliente">
                            Informe o ID do Cliente
                        </label>{" "}
                        <select
                            name="clienteId"
                            className="form-select"
                            aria-label=""
                            value={newReserva.clienteId}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>
                                Selecione o Cliente
                            </option>
                            {clients.map((element) => (
                                <option key={element.clienteId} value={element.clienteId}>
                                    {element.clienteId} - {element.nome}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="nomeCliente">
                            Informe o ID do Pacote
                        </label>{" "}
                        <select
                            name="destinoId"
                            className="form-select"
                            aria-label=""
                            value={newReserva.destinoId}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>
                                Selecione o Destino
                            </option>
                            {destinos.map((element) => (
                                <option key={element.destinoId} value={element.destinoId}>
                                    {element.destinoId} - {element.destino} / {element.localidade}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="d-flex flex-row flex-wrap justify-content-center align-items-center mb-4 mt-3">
                    <div className="form-outline flex-fill mx-1 mb-2">
                        <label
                            className="form-label"
                            htmlFor="num_passageiros"
                        >
                            Número de Passageiros
                        </label>{" "}
                        <input
                            type="number"
                            id="num_passageiros"
                            className="form-control w-25 text-center"
                            name="numPassageiros"
                            onChange={handleInputChange}
                            value={newReserva.num_passageiros}
                            min={1}
                            required=""
                        />
                    </div>
                </div>
                <h2 className="text-center my-3">
                    Valor final será calculado ao salvar a reserva
                </h2>
                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button
                        onClick={handleAddReserva}
                        className="btn btn-success btn-lg"
                    >
                        Cadastrar Dados
                    </button>
                </div>


            </main>
        </div>

    );
};

export default AddReserva;