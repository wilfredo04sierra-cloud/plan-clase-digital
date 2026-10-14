import React from 'react';

function ObjetivosCard({ competencia, indicadorLogro }) {
  return (
    <section className="objetivos-card">
      <h2>🎯 Metas de Aprendizaje</h2>
      <div className="objetivo-bloque">
        <h3>Competencia</h3>
        <p>{competencia}</p>
      </div>
      <div className="objetivo-bloque">
        <h3>Indicador de Logro</h3>
        <p>{indicadorLogro}</p>
      </div>
    </section>
  );
}

export default ObjetivosCard;