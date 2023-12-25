import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import Link from 'next/link';

export default function CardClientes() {
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
        <div className="row">
          {destinos.map((element) => (
            <div className="col-sm-6 mt-2" key={element.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-secondary">Id do Destino: {element.destinoId}</h5>
                  <hr />
                  <p className="card-text">
                    <span className='fw-semibold'>Destino: </span>
                    <span className='text-secondary'>{element.destino}</span>
                  </p>
                  <p className="card-text">
                    <span className='fw-semibold'>País / Localidade: </span>
                    <span className='text-secondary'>{element.localidade}</span>
                  </p>
                  <div className="card-footer text-center">
                    <ul className="nav d-flex justify-content-center">
                      <li className="nav-item">
                        <Link href={`view-destino/${element.destinoId}`} className="nav-link" type="button">
                          Detalhes</Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href={`update-destino/${element.destinoId}`}>
                          Editar
                        </a>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link text-danger fw-semibold" onClick={() => handleDelete(element.destinoId)}>
                          Excluir
                        </button>
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

