import React from 'react';
import { motion } from 'framer-motion';

function HeaderClase({ tituloTema, nombreDocente, horario }) {
  return (
    <motion.header 
      className="header-clase"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-badge">Plan de Clase Digital Interactivo</div>
      <h1>{tituloTema}</h1>
      <div className="header-meta">
        <p>👨‍🏫 <strong>Docente:</strong> {nombreDocente}</p>
        <p>⏰ <strong>Horario:</strong> {horario}</p>
      </div>
    </motion.header>
  );
}

export default HeaderClase;