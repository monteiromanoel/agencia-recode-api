import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import styles from "@/styles/Lists.module.css"

export default function CardReservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7079/api/Reservas")
      .then((response) => {
        setReservas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de reservas:", error);
      });
  }, []);

  return (
    <form className='container'>
      <div>
        <div className="row">
          {reservas.map((element) => (
            <div className="col-sm-6 mt-2" key={element.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-secondary">Id da Reserva: {element.reservaId}</h5>
                  <hr />
                  <p className="card-text">
                    <span className='fw-semibold'>Id do Cliente: </span>
                    <span className='text-secondary'>{element.clienteId}</span>
                  </p>
                  <p className="card-text">
                    <span className='fw-semibold'>Id do Destino: </span>
                    <span className='text-secondary'>{element.destinoId}</span>
                  </p>
                  <p className="card-text">
                    <span className='fw-semibold'>Data da Reserva: </span>
                    <span className='text-secondary'>{new Date(element.dataReserva).toLocaleDateString()}</span>
                  </p>
                  <div className="card-footer text-center">
                    <ul className="nav d-flex justify-content-center">
                      <li className="nav-item">
                        <a href={`cliente/update-cliente/${element.clienteId}`} className="nav-link">
                          Detalhes
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Editar
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link text-danger fw-semibold" href="#">
                          Excluir
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  )
}

