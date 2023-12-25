import React from 'react'
import "bootstrap/dist/css/bootstrap.css";

export default function Footer() {
  return (
    <footer className="row container-fluid footer">
      <div className="col col-md-8">&reg; Recode Viagens - 2023</div>
      <div className="col col-6 col-md-4 d-flex justify-content-end">Versão
        - (API) 4.0</div>
    </footer>
  )
}
