import React, { useState } from 'react';

function ActividadItem({ fase, titulo, duracion, dificultad = "Medio" }) {
  // Hook useState para alternar entre pendiente (false) y completada (true)
  const [completada, setCompletada] = useState(false);

  const alternarEstado = () => {
    setCompletada(!completada);
  };

  return (
    <div 
      className={`actividad-card ${completada ? 'actividad-completada' : 'actividad-pendiente'}`}
      role="region"
      aria-label={`Actividad: ${titulo}`}
    >
      <div className="actividad-cuerpo">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          {fase && <span className="actividad-fase">{fase}</span>}
          {/* Mejora pedagógica: Etiqueta de nivel / ritmo formativo */}
          <span 
            style={{ 
              fontSize: '0.75rem', 
              padding: '2px 8px', 
              borderRadius: '12px', 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#a0aec0'
            }}
          >
            Nivel: {dificultad}
          </span>
        </div>

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
        aria-pressed={completada}
      >
        {completada ? 'Marcar como pendiente' : 'Completar actividad'}
      </button>
    </div>
  );
}

export default ActividadItem;