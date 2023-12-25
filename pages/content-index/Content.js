import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import styles from "@/styles/Content.module.css"

export default function Content() {
  return (
    <>
      <div className="container-fluid conteudo mb-3">
        <main className="row overflow-auto mb-3">
          <div className="col pt-4 pb-4">
            <h1>Dashboard de Administrador</h1>
            <p className="lead">Acesse os campos por aqui ou pelo menu</p>
            <hr />
            <div className="row d-flex flex-wrap justify-content-center my-3">
              <div className="col-sm-5 mb-3">
                <div className={`${styles.card} card`} >
                  <div className="card-body">
                    <h5 className="card-title fs-3 text-decoration-underline">Clientes</h5>
                    <p className="card-text">
                      Acesse dados referentes aos clientes. Atualize, delete ou
                      cadastre novos
                    </p>
                    <div className="d-flex justify-content-center">
                      <a
                        href="/Agencia-Viagem-V2/ListarUsuarios"
                        className={`${styles.btn} btn mx-2`}
                      >
                        Lista de Clientes
                      </a>
                      <a
                        href="./CadastroCliente.jsp"
                        className={`${styles.btn} btn mx-2`}
                      >
                        Cadastro de Cliente
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-5">
                <div className={`${styles.card} card`}>
                  <div className="card-body">
                    <h5 className="card-title fs-3 text-decoration-underline">Destinos</h5>
                    <p className="card-text">
                      Acesse dados referentes aos destinos. Atualize, delete ou
                      cadastre novos
                    </p>
                    <div className="d-flex justify-content-center">
                      <a
                        href="/Agencia-Viagem-V2/ListarDestinos"
                        className={`${styles.btn} btn mx-2`}
                      >
                        Lista de Destinos
                      </a>
                      <a
                        href="./CadastroDestino.jsp"
                        className={`${styles.btn} btn mx-2`}
                      >
                        Cadastro de Destino
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex flex-wrap justify-content-center">
              <div className="col-sm-5">
                <div className={`${styles.card} card`}>
                  <div className="card-body">
                    <h5 className="card-title fs-3 text-decoration-underline">Reservas</h5>
                    <p className="card-text">
                      Acesse dados referentes às reservas. Atualize, delete ou
                      cadastre novos
                    </p>
                    <div className="d-flex justify-content-center">
                      <a
                        href="/Agencia-Viagem-V2/ListarReservas"
                        className={`${styles.btn} btn mx-2`}
                      >
                        Lista de Reservas
                      </a>
                      <a
                        href="/Agencia-Viagem-V2/CadastroReservaAdm"
                        className={`${styles.btn} btn mx-2`}
                      >
                        Cadastro de Reserva
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

    </>
  )
}
