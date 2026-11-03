import React from 'react';
import HeaderClase from './components/HeaderClase';
import ObjetivosCard from './components/ObjetivosCard';
// 1. Importamos el nuevo componente que se conecta a NocoDB
import ListaActividades from './components/ListaActividades';
import './App.css';

function App() {
  return (
    <div className="contenedor-plan">
      <HeaderClase 
        tituloTema="Plan de Clase Digital Interactivo"
        nombreDocente="Edin Wilfredo Sierra Cahueque"
        horario="Sábados de 07:00 a 09:20 AM"
      />

      <ObjetivosCard 
        competencia="Aplica la arquitectura de componentes modulares y el manejo de estado en React para la construcción de software educativo."
        indicadorLogro="Estructura componentes funcionales con paso de props e integra interactividad reactiva mediante el Hook useState."
      />

      {/* 2. Reemplazamos la sección vieja por el componente dinámico */}
      <ListaActividades />
    </div>
  );
}

export default App;