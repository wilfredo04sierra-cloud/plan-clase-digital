import React, { useState, useEffect } from 'react';

function ListaActividades() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Tu URL exacta copiada hasta el 25
        const url = 'https://app.nocodb.com/api/v3/data/p572h4cqc32lcmh/md5izydx6cpv9pd/records?pageSize=25';
        
        const respuesta = await fetch(url, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            // Tu xc-token real
            'xc-token': 'nc_pat_Yanwr5n2tInxXg5vSw5qgdFl63qBdC4KkcuINPhR'
          }
        });

        if (!respuesta.ok) {
          throw new Error('Error en la comunicación con el servidor');
        }

        const datos = await respuesta.json();
        // En la versión v3 de NocoDB, la lista viene en datos.list
        setActividades(datos.list || []); 
        
      } catch (error) {
        console.error('Fallo en la petición HTTP:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  if (cargando) {
    return <div className="cargando-estado">⏳ Conectando a la base de datos en la nube...</div>;
  }

  return (
    <section className="lista-nube-container">
      <h2>☁️ Actividades desde NocoDB</h2>
      <div className="grid-actividades">
        {actividades.map((act) => {
          // Ajuste clave: Leemos los datos directamente de 'act', ya que NocoDB v3 no usa 'fields' aquí
          const titulo = act.title;
          const duracion = act.duration;
          const completada = act.completed;
          const categoria = act.category;

          return (
            <div key={act.Id} className="actividad-card nube-card">
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