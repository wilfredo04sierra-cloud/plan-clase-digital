import React, { useState, useEffect } from 'react';

function ListaActividades() {
  // 1. Definición de los hooks useState (semáforo de carga y almacenamiento)
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 2. Implementación del mensajero asincrónico con useEffect
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // REEMPLAZA ESTA URL CON TU ENDPOINT DE NOCODB
        const url = 'https://app.nocodb.com/api/v3/data/p572h4cqc32lcmh/md5izydx6cpv9pd/records?pageSize=25';
        
        const respuesta = await fetch(url, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            // REEMPLAZA ESTE TOKEN CON TU XC-TOKEN REAL
            'xc-token': 'nc_pat_Yanwr5n2tInxXg5vSw5qgdFl63qBdC4KkcuINPhR'
          }
        });

        if (!respuesta.ok) {
          throw new Error('Error en la comunicación con el servidor');
        }

        const datos = await respuesta.json();
        // Extraemos la lista de registros de la respuesta
        setActividades(datos.list || []); 
        
      // 3. Blindaje con el bloque .catch() ante fallos de red
      } catch (error) {
        console.error('Fallo en la petición HTTP:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  // Renderizado del semáforo de carga
  if (cargando) {
    return <div className="cargando-estado">⏳ Conectando a la base de datos en la nube...</div>;
  }

  return (
    <section className="lista-nube-container">
      <h2>☁️ Actividades desde NocoDB</h2>
      <div className="grid-actividades">
        {/* Renderizado funcional extrayendo la gaveta fields mediante .map() */}
        {actividades.map((act) => {
          // Extraemos de la gaveta fields si NocoDB la anida, o usamos el objeto directo
          const titulo = act.fields ? act.fields.title : act.title;
          const duracion = act.fields ? act.fields.duration : act.duration;
          const completada = act.fields ? act.fields.completed : act.completed;
          const categoria = act.fields ? act.fields.category : act.category;

          return (
            <div key={act.Id || act.id} className="actividad-card nube-card">
              <span className="actividad-fase">{categoria}</span>
              <h3>{titulo}</h3>
              <p>⏱️ Duración: {duracion}</p>
              <span className={`badge-estado ${completada ? 'badge-ok' : 'badge-wait'}`}>
                {completada ? '✅ Finalizada' : '⏳ Pendiente'}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ListaActividades;