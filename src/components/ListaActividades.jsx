import React, { useState, useEffect } from 'react';

function ListaActividades() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Pega aquí tu URL COMPLETA (puedes copiarla toda desde NocoDB, incluyendo la parte final del viewId)
        const url = 'https://app.nocodb.com/api/v3/data/p572h4cqc32lcmh/md5izydx6cpv9pd/records?pageSize=25';
        
        const respuesta = await fetch(url, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            // Pega tu xc-token real dentro de estas comillas simples
            'xc-token': 'gu_a_de_aprendizaje_7-edin_wilfredo_zaca'
          }
        });

        if (!respuesta.ok) {
          // Si NocoDB rechaza la conexión, capturamos el motivo exacto
          const errorDetalle = await respuesta.text();
          throw new Error(`NocoDB dice: ${respuesta.status} - ${errorDetalle}`);
        }

        const datos = await respuesta.json();
        setActividades(datos.list || []); 
        
      } catch (error) {
        console.error('Fallo técnico:', error);
        setMensajeError(error.message); // Esto mostrará el error en tu página
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  // 1. Mostrar estado de carga
  if (cargando) {
    return <div className="cargando-estado">⏳ Conectando a NocoDB...</div>;
  }

  // 2. Mostrar error en pantalla si algo falla (Programación defensiva)
  if (mensajeError) {
    return (
      <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', textAlign: 'center', margin: '1rem 0' }}>
        <h3>🚨 Error de Conexión</h3>
        <p>{mensajeError}</p>
        <p><small>Verifica que tu xc-token esté bien copiado.</small></p>
      </div>
    );
  }

  // 3. Mostrar aviso si la base de datos está vacía
  if (actividades.length === 0) {
    return <div className="cargando-estado">No hay actividades. Agrega datos en NocoDB.</div>;
  }

  // 4. Renderizar las tarjetas correctamente
  return (
    <section className="lista-nube-container">
      <h2>☁️ Actividades desde NocoDB</h2>
      <div className="grid-actividades">
        {actividades.map((act) => {
          // Ajuste: Le decimos a React que busque "Title" con mayúscula o minúscula
          const titulo = act.Title || act.title || 'Sin título';
          const duracion = act.duration || '0 min';
          const completada = act.completed || false;
          const categoria = act.category || 'General';

          return (
            <div key={act.Id || Math.random()} className="actividad-card nube-card">
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