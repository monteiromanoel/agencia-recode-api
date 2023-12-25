import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import styles from "@/styles/Lists.module.css"
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

export default function TableClientes() {
  const [clients, setClients] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    axios
      .get("https://localhost:7079/api/Clientes")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de clientes:", error);
      });
  }, []);

  const handleDelete = (clientId) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      setClients(clients.filter(client => client.clienteId !== clientId));

      axios.delete(`https://localhost:7079/api/Clientes/${clientId}`)
        .then((response) => {
          setDeleteMessage(`Cliente com ID ${clientId} foi excluído.`);
        })
        .catch((error) => {
          console.error(`Erro ao excluir o cliente com ID ${clientId}:`, error);
        });
    }
  };

  return (
    <form className='container'>
      <div>
        {deleteMessage && <div className="alert alert-success alert-dismissible fade show" role="alert">
          {deleteMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <td scope="col" className="headerTable text-white">
                #
              </td>
              <td scope="col" className="headerTable text-white">
                Nome
              </td>
              <td scope="col" className="headerTable text-white">
                E-mail
              </td>
              <td scope="col" className="headerTable text-white">
                Ações
              </td>
            </tr>
          </thead>
          <tbody>
            {clients.map((element) => (
              <tr key={element.clienteId}>
                <td>{element.clienteId}</td>
                <td>{element.nome}</td>
                <td>{element.email}</td>
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
                    <ul className="dropdown-menu" aria-labelledby={`dropdownMenu-${element.clienteId}`}>
                      <li>
                        <Link href={`view-client/${element.clienteId}?source=table`} className="btn dropdown-item" type="button">
                          Detalhes</Link>
                      </li>
                      <li>
                        <a href={`update-client/${element.clienteId}?source=table`} className="dropdown-item" type="button">
                          Editar
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fw-semibold text-danger" type="button" onClick={() => handleDelete(element.clienteId)}>
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
