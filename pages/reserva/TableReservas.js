import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import styles from "@/styles/Lists.module.css"
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

export default function TableReservas() {
  const [reservas, setReservas] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

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

  const handleDelete = (reservaId) => {
    if (confirm('Tem certeza que deseja excluir esta reserva?')) {
      setReservas(reservas.filter(reserva => reserva.reservaId !== reservaId));

      axios.delete(`https://localhost:7079/api/Reservas/${reservaId}`)
        .then((response) => {
          setDeleteMessage(`Reserva com ID ${reservaId} foi excluída.`);
        })
        .catch((error) => {
          console.error(`Erro ao excluir o reserva com ID ${reservaId}:`, error);
        });
    }
  };


  return (
    <form className='container'>
      {deleteMessage && <div className="alert alert-success alert-dismissible fade show" role="alert">
          {deleteMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}
      <div>
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <td scope="col" className="headerTable text-white">
                #
              </td>
              <td scope="col" className="headerTable text-white">
                Id do Cliente
              </td>
              <td scope="col" className="headerTable text-white">
              Id do Destino
              </td>
              <td scope="col" className="headerTable text-white">
              Data da Reserva
              </td>
              <td scope="col" className="headerTable text-white">
                Ações
              </td>
            </tr>
          </thead>
          <tbody>
            {reservas.map((element) => (
              <tr key={element.Id}>
                <td>{element.reservaId}</td>
                <td>{element.clienteId}</td>
                <td>{element.destinoId}</td>
                <td>{new Date(element.dataReserva).toLocaleDateString()}</td>

                <td>
                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      id={`dropdownMenu-${element.clienteId}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        className={`${styles.icones} fs-4 text-secondary acoes`}
                      />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby={`dropdownMenu-${element.reservaId}`}>
                      <li>
                        <Link href={`view-reserva/${element.reservaId}?source=table`} className="btn dropdown-item" type="button">
                            Detalhes</Link>
                      </li>
                      <li>
                        <a className="dropdown-item fw-semibold text-danger" type="button" onClick={() => handleDelete(element.reservaId)}>
                          Excluir
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  )
}
