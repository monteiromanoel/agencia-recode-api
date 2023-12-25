import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import Link from 'next/link';

export default function CardClientes() {
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
        <div className="row">
          {clients.map((element) => (
            <div className="col-sm-6 mt-2" key={element.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-secondary">Id do Usuário: {element.clienteId}</h5>
                  <hr />
                  <p className="card-text">
                    <span className='fw-semibold'>Nome: </span>
                    <span className='text-secondary'>{element.nome}</span>
                  </p>
                  <p className="card-text">
                    <span className='fw-semibold'>Email: </span>
                    <span className='text-secondary'>{element.email}</span>
                  </p>
                  <div className="card-footer text-center">
                    <ul className="nav d-flex justify-content-center">
                      <li className="nav-item">
                        <Link href={`view-client/${element.clienteId}`} className="nav-link" type="button">
                          Detalhes</Link>
                      </li>
                      <li className="nav-item">
                        <a href={`update-client/${element.clienteId}`} className="nav-link" type="button">
                          Editar
                        </a>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link text-danger fw-semibold" onClick={() => handleDelete(element.clienteId)}>
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

