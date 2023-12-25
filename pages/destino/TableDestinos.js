import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import styles from "@/styles/Lists.module.css"
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

export default function TableDestinos() {
  const [destinos, setDestinos] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    axios
      .get("https://localhost:7079/api/Destinos")
      .then((response) => {
        setDestinos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de destinos:", error);
      });
  }, []);

  const handleDelete = (destinoId) => {
    if (confirm('Tem certeza que deseja excluir este destino?')) {
      setDestinos(destinos.filter(destino => destino.destinoId !== destinoId));

      axios.delete(`https://localhost:7079/api/Destinos/${destinoId}`)
        .then((response) => {
          setDeleteMessage(`Destino com ID ${destinoId} foi excluído.`);
        })
        .catch((error) => {
          console.error(`Erro ao excluir o destino com ID ${destinoId}:`, error);
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
                Destino
              </td>
              <td scope="col" className="headerTable text-white">
                Tipo do Pacote
              </td>
              <td scope="col" className="headerTable text-white">
                Ações
              </td>
            </tr>
          </thead>
          <tbody>
            {destinos.map((element) => (
              <tr key={element.Id}>
                <td>{element.destinoId}</td>
                <td>{element.destino} / {element.localidade}</td>
                <td className={element.tipo_pacote === 'convencional' ? 'convencional' : 'promocional'}>
                  {element.tipo_pacote}
                </td>

                <td>
                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      id={`dropdownMenu-${element.destinoId}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        className={`${styles.icones} fs-4 text-secondary acoes`}
                      />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby={`dropdownMenu-${element.destinoId}`}>
                      <li>
                        <Link href={`view-destino/${element.destinoId}`} className="btn dropdown-item" type="button">
                          Detalhes</Link>
                      </li>
                      <li>
                        <a href={`update-destino/${element.destinoId}`} className="dropdown-item" type="button">
                          Editar
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fw-semibold text-danger" type="button" onClick={() => handleDelete(element.destinoId)}>
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
