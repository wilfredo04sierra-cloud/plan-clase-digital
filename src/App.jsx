// src/App.jsx
import React from 'react';
import HeaderClase from './components/HeaderClase';
import ObjetivosCard from './components/ObjetivosCard';
import ActividadItem from './components/ActividadItem';
import './App.css';

function App() {
  const listaActividades = [
    {
      id: 1,
      fase: 'Diagnóstica',
      titulo: 'Trivia Rápida Interactiva',
      duracion: '5 minutos'
    },
    {
      id: 2,
      fase: 'Construcción',
      titulo: 'Taller Guiado de Componentes',
      duracion: '25 minutos'
    },
    {
      id: 3,
      fase: 'Aplicación',
      titulo: 'Pruebas de Estado con useState',
      duracion: '25 minutos'
    }
  ];

  return (
    <div className="contenedor-plan">
      {/* 1. Componente de Encabezado */}
      <HeaderClase 
        tituloTema="Plan de Clase Digital Interactivo"
        nombreDocente="Edin Wilfredo Sierra Cahueque"
        horario="Sábados de 07:00 a 09:20 AM"
      />

      {/* 2. Componente de Metas de Aprendizaje */}
      <ObjetivosCard 
        competencia="Aplica la arquitectura de componentes modulares y el manejo de estado en React para la construcción de software educativo."
        indicadorLogro="Estructura componentes funcionales con paso de props e integra interactividad reactiva mediante el Hook useState."
      />

      {/* 3. Sección de Actividades Dinámicas */}
      <section className="seccion-actividades">
        <h2 className="titulo-secuencia">Secuencia Didáctica de la Sesión</h2>
        <div className="lista-actividades">
          {listaActividades.map((act) => (
            <ActividadItem 
              key={act.id}
              fase={act.fase}
              titulo={act.titulo}
              duracion={act.duracion}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;