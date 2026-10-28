import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ActividadItem({ fase, titulo, duracion }) {
  const [completada, setCompletada] = useState(false);

  const alternarEstado = () => {
    setCompletada(!completada);
  };

  return (
    <motion.div 
      className={`actividad-card ${completada ? 'actividad-completada' : 'actividad-pendiente'}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
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
      <motion.button 
        type="button" 
        className={`btn-estado ${completada ? 'btn-desmarcar' : 'btn-marcar'}`}
        onClick={alternarEstado}
        whileTap={{ scale: 0.9 }}
      >
        {completada ? 'Marcar como pendiente' : 'Completar actividad'}
      </motion.button>
    </motion.div>
  );
}

export default ActividadItem;