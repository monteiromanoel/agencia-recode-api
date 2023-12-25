import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import styles from "@/styles/Lists.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import TableClientes from './TableClientes';
import CardClientes from './CardClientes';


export default function listaClientes() {
  const [mostrarTabela, setMostrarTabela] = useState(true);

  const handleClickIconeLista = () => {
    setMostrarTabela(true);
  };

  const handleClickIconeCartao = () => {
    setMostrarTabela(false);
  };
  return (
    <>
      <div className="container-fluid conteudo">
        <main>
          <h1><FontAwesomeIcon
              icon={faUsers} /> - Lista de Clientes
          </h1>
          <hr></hr>
          <div className='container my-3 fs-4 d-flex gap-1 icones justify-content-end'>
            <FontAwesomeIcon
              icon={faList}
              className={`${styles.icones} icones p-2 rounded ${mostrarTabela ? styles.activeIcon : ''}`}
              onClick={handleClickIconeLista} data-bs-toggle="tooltip" title="Tabela"
            />
            <FontAwesomeIcon
              icon={faThLarge}
              className={`${styles.icones} icones p-2 rounded ${!mostrarTabela ? styles.activeIcon : ''}`}
              onClick={handleClickIconeCartao} data-bs-toggle="tooltip" title="Cards"
            />
          </div>
          {mostrarTabela ? <TableClientes /> : <CardClientes />}
        </main>
      </div>


    </>
  )
}
