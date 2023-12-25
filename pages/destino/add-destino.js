import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import InputMask from "react-input-mask";

const AddDestino = () => {
    const [newDestino, setNewDestino] = useState({
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
        preco_antigo: ""
    });
    const router = useRouter();

    const handleInputChange = (e) => {
        setNewDestino({ ...newDestino, [e.target.name]: e.target.value });
    };


    const handleDescricaoLongaChange = (content, editor) => {
        setNewDestino({ ...newDestino, descricao_longa: content });
    };

    const handleAddDestino = () => {
        const {
            diaIda,
            mesIda,
            anoIda,
            diaVolta,
            mesVolta,
            anoVolta,
            ...rest
        } = newDestino;


        const dataIda = new Date(`${anoIda}-${mesIda}-${diaIda}`);
        const dataVolta = new Date(`${anoVolta}-${mesVolta}-${diaVolta}`);
        const precoString = newDestino.preco.toString().replace('.', ',');
        const precoDecimal = parseFloat(precoString);
        const precoAntDecimal = parseFloat(newDestino.preco_antigo);

        const formattedDestino = {
            ...rest,
            data_ida: dataIda,
            data_volta: dataVolta,
            preco: precoDecimal,
            preco_antigo: precoAntDecimal
        };

        Object.keys(formattedDestino).forEach((key) => {
            if (formattedDestino[key] === '') {
                formattedDestino[key] = null;
            }
        });

        console.log(JSON.stringify(formattedDestino, null, 2));


        axios
            .post("https://localhost:7079/api/Destinos", formattedDestino)
            .then((response) => {
                router.push("/destino/PageDestinos");
            })
            .catch((error) => {
                alert("Erro ao inserir destino:" + error);
                console.log(error);
            });
    };

    return (
        <div className="container conteudo">
            <main className="col pt-2 pb-4">
                <h1 className="text-center">Cadastro de Destino</h1>
                <hr></hr>
                <>
                    <div className="d-flex flex-row flex-wrap align-items-center gap-1 mb-4 mt-3">
                        <div className="form-outline flex-fill mx-1 mb-0">
                            <label className="form-label" htmlFor="destino">
                                Destino
                            </label>{" "}
                            <input
                                type="text"
                                id="destino"
                                className="form-control"
                                name="destino"
                                placeholder="Insira um destino"
                                value={newDestino.destino}
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
                                value={newDestino.localidade}
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
                                        value={newDestino.diaIda}
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
                                        value={newDestino.mesIda}
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
                                        value={newDestino.anoIda}
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
                                        value={newDestino.diaVolta}
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
                                        value={newDestino.mesVolta}
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
                                        value={newDestino.anoVolta}
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
                                value={newDestino.adicional}
                                onChange={handleInputChange}
                                maxLength={90}
                                required=""
                            />
                        </div>
                        <div className="form-outline flex-fill mx-1 mb-0">
                            <label className="form-label" htmlFor="tipo_pacote">
                                Tipo do Pacote{" "}
                            </label>{" "}
                            <select id="tipo_pacote" className="form-control form-select" name="tipo_pacote" value={newDestino.tipo_pacote} onChange={handleInputChange}>
                                <option value="promocional" selected>promocional</option>
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
                                value={newDestino.descricao_curta}
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
                                value={newDestino.descricao_longa}
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
                                            value={newDestino.label_promocao}
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
                                            value={newDestino.preco_antigo}
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
                                value={newDestino.preco}
                                onChange={handleInputChange}
                                placeholder="0,00"
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
                                value={newDestino.imagem}
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
                                value={newDestino.imagem2}
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
                                value={newDestino.imagem3}
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
                                value={newDestino.imagem4}
                                onChange={handleInputChange}
                                placeholder="Adicione o link da imagem"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button onClick={handleAddDestino} className="btn btn-success btn-lg">
                            Cadastrar Destino
                        </button>
                    </div>
                </>

            </main>
        </div>

    );
};

export default AddDestino;