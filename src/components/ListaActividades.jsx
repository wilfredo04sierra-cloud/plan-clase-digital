import React, { useState, useEffect } from 'react';

// Subcomponente individual para cada actividad
function TarjetaActividad({ titulo, duracion, estadoInicial, categoria }) {
  // Toma como punto de partida lo que dictó la base de datos en NocoDB
  const [completada, setCompletada] = useState(estadoInicial);

  const alternarEstado = () => {
    setCompletada(!completada);
  };

  return (
    <div className={`actividad-card nube-card ${completada ? 'actividad-completada' : 'actividad-pendiente'}`}>
      <div className="actividad-cuerpo">
        <span className="actividad-fase">{categoria}</span>
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

function ListaActividades() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorWeb, setErrorWeb] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const url = 'https://app.nocodb.com/api/v3/data/p572h4cqc32lcmh/md5izydx6cpv9pd/records?pageSize=25';
        const tokenCrudo = 'nc_pat_uT3ZBpXMtVR99BEV9CXPJrbKp5yblkVHrp4lIvTT';
        const tokenSeguro = tokenCrudo.replace(/[^\x20-\x7E]/g, '').trim();

        const respuesta = await fetch(url, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'xc-token': tokenSeguro
          }
        });

        if (!respuesta.ok) {
          throw new Error(`El servidor rechazó la conexión (Error ${respuesta.status}).`);
        }

        const datos = await respuesta.json();
        const registros = datos.records || datos.list || [];
        setActividades(registros);
      } catch (error) {
        console.error('Fallo en la petición HTTP:', error);
        setErrorWeb(error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  if (cargando) {
    return <div className="cargando-estado">⏳ Conectando a la base de datos en la nube...</div>;
  }

  if (errorWeb) {
    return (
      <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', margin: '2rem auto', maxWidth: '600px', textAlign: 'center' }}>
        <h3>🚨 Hubo un problema de conexión</h3>
        <p>{errorWeb}</p>
      </div>
    );
  }

  return (
    <section className="lista-nube-container">
      <h2>Secuencia Didáctica de la Sesión</h2>
      
      {actividades.length === 0 ? (
        <p style={{textAlign: 'center', color: '#94a3b8'}}>No hay actividades registradas.</p>
      ) : (
        <div className="grid-actividades">
          {actividades.map((act) => {
            const campos = act.fields || act;

            return (
              <TarjetaActividad 
                key={act.id || act.Id || Math.random()}
                titulo={campos.title || campos.Title || 'Sin título'}
                duracion={campos.duration || 'Sin duración'}
                estadoInicial={Boolean(campos.completed)}
                categoria={campos.category || 'General'}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ListaActividades;