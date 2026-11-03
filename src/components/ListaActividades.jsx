import React, { useState, useEffect } from 'react';

// Subcomponente interactivo conectado bidireccionalmente a NocoDB
function TarjetaActividad({ id, titulo, duracion, estadoInicial, categoria }) {
  const [completada, setCompletada] = useState(estadoInicial);
  const [guardando, setGuardando] = useState(false);

  const alternarEstado = async () => {
    const nuevoEstado = !completada;
    // 1. Cambio visual inmediato en la interfaz
    setCompletada(nuevoEstado);
    setGuardando(true);

    try {
      const url = 'https://app.nocodb.com/api/v3/data/p572h4cqc32lcmh/md5izydx6cpv9pd/records';
      const tokenCrudo = 'nc_pat_uT3ZBpXMtVR99BEV9CXPJrbKp5yblkVHrp4lIvTT';
      const tokenSeguro = tokenCrudo.replace(/[^\x20-\x7E]/g, '').trim();

      // 2. Petición PATCH: Escribe el cambio directamente en la base de datos
      const respuesta = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'xc-token': tokenSeguro
        },
        body: JSON.stringify([
          {
            Id: id,
            id: id,
            completed: nuevoEstado
          }
        ])
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo guardar el cambio en la base de datos');
      }
    } catch (error) {
      console.error('Error al actualizar en NocoDB:', error);
      // Si falla la red, revertimos el botón a su estado anterior
      setCompletada(!nuevoEstado);
    } finally {
      setGuardando(false);
    }
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
          {guardando && <small style={{ color: '#38bdf8', marginLeft: '8px' }}>Sincronizando...</small>}
        </div>
      </div>

      <button 
        type="button" 
        className={`btn-estado ${completada ? 'btn-desmarcar' : 'btn-marcar'}`}
        onClick={alternarEstado}
        disabled={guardando}
      >
        {guardando ? 'Guardando en nube...' : completada ? 'Marcar como pendiente' : 'Completar actividad'}
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
            const registroId = act.Id || act.id || campos.Id || campos.id;

            return (
              <TarjetaActividad 
                key={registroId || Math.random()}
                id={registroId}
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