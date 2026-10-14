import React from 'react';

function HeaderClase({ tituloTema, nombreDocente, horario }) {
  return (
    <header className="header-clase">
      <div className="header-badge">Plan de Clase Digital Interactivo</div>
      <h1>{tituloTema}</h1>
      <div className="header-meta">
        <p>👨‍🏫 <strong>Docente:</strong> {nombreDocente}</p>
        <p>⏰ <strong>Horario:</strong> {horario}</p>
      </div>
    </header>
  );
}

export default HeaderClase;