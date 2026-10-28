import React from 'react';
import { motion } from 'framer-motion';

function ObjetivosCard({ competencia, indicadorLogro }) {
  return (
    <motion.section 
      className="objetivos-card"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <h2>🎯 Metas de Aprendizaje</h2>
      <div className="objetivo-bloque">
        <h3>Competencia</h3>
        <p>{competencia}</p>
      </div>
      <div className="objetivo-bloque">
        <h3>Indicador de Logro</h3>
        <p>{indicadorLogro}</p>
      </div>
    </motion.section>
  );
}

export default ObjetivosCard;