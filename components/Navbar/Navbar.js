import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import NavItem from './NavItem.js';
import DropdownObj from './DropdownObj.js';
import Link from 'next/link.js';

const Navbar = (props) => {
  useEffect(() => {
    // Verifica se o código está sendo executado no ambiente do navegador
    if (typeof window !== 'undefined') {
      // Importa os recursos do Bootstrap que requerem o DOM do navegador
      require('bootstrap/dist/js/bootstrap.js');
    }
  }, []);

  const usuariosDropdownItems = [
    { label: 'Listar', link: '/cliente/PageClientes' },
    { label: 'Cadastrar', link: '/cliente/add-client' },

  ];

  const destinosDropdownItems = [
    { label: 'Listar', link: '/destino/PageDestinos' },
    { label: 'Cadastrar', link: '/destino/add-destino' },

  ];

  const reservasDropdownItems = [
    { label: 'Listar', link: '/reserva/PageReservas' },
    { label: 'Cadastrar', link: '/reserva/add-reserva' },

  ];
  return (
    <div>
      <header className="container">
        <nav
          className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm"
          id="menu"
        >
          <div className="container-fluid">
          <Link href="/" className="navbar-brand">{" "}
              Adm - Recode Viagens{" "}</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse flex-row-reverse"
              id="navbarContent"
            >
              <ul className="navbar-nav d-flex align-items-center">
                <NavItem link="/" active={true} label="Home" />
                <DropdownObj label="Usuários" icon="fa-users" dropdownItems={usuariosDropdownItems} />
                <DropdownObj label="Destinos" icon="fa-map-marked" dropdownItems={destinosDropdownItems} />
                <DropdownObj label="Reservas" icon="fa-map-marked" dropdownItems={reservasDropdownItems} />
              </ul>
            </div>
          </div>
        </nav>
      </header>

    </div>
  )
}

export default Navbar