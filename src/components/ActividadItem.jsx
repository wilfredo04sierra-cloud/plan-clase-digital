import React, { useState } from 'react';

function ActividadItem({ fase, titulo, duracion }) {
  // Hook useState para alternar entre pendiente (false) y completada (true)
  const [completada, setCompletada] = useState(false);

  const alternarEstado = () => {
    setCompletada(!completada);
  };

  return (
    <div className={`actividad-card ${completada ? 'actividad-completada' : 'actividad-pendiente'}`}>
      <div className="actividad-cuerpo">
        {fase && <span className="actividad-fase">{fase}</span>}
        <h3 className={completada ? 'texto-tachado' : ''}>{titulo}</h3>
        <p className="actividad-duracion">⏱️ Duración: {duracion}</p>
        <div className="actividad-estado-badge">
          <span className={`badge-estado ${completada ? 'badge-ok' : 'badge-wait'}`}>
            {completada ? '✅ Completada' : '⏳ Pendiente'}
          </span>
        </div>
      </div>
      <button 
        type="button" 
        className={`btn-estado ${completada ? 'btn-desmarcar' : 'btn-marcar'}`}
        onClick={alternarEstado}
      >
        {completada ? 'Marcar como pendiente' : 'Completar actividad'}
      </button>
    </div>
  );
}

export default ActividadItem;