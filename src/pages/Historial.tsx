import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Historial.css';

export type CotizacionGuardada = {
  id: string;
  fecha: string;
  provincia: string;
  ciudad: string;
  tipoPropiedad: string;
  metros: number;
  precioTotal: number;
};

const Historial: React.FC = () => {
  const [historial, setHistorial] = useState<CotizacionGuardada[]>([]);

  useEffect(() => {
    const dataGuardada = localStorage.getItem('cotizaciones');
    if (dataGuardada) {
      setHistorial(JSON.parse(dataGuardada));
    }
  }, []);

  const limpiarHistorial = () => {
    localStorage.removeItem('cotizaciones');
    setHistorial([]);
  };

  // --- FUNCIÓN PARA ELIMINAR UN ITEM ---
  const eliminarCotizacion = (idParaEliminar: string) => {
    
    const nuevoHistorial = historial.filter((item) => item.id !== idParaEliminar);
    
    
    setHistorial(nuevoHistorial);
    
    
    localStorage.setItem('cotizaciones', JSON.stringify(nuevoHistorial));
  };

  return (
    <div className="historial-container">
      <div className="historial-header">
        <h1>Historial de Cotizaciones</h1>
        <Link to="/" className="boton-volver">
          &larr; Volver al Cotizador
        </Link>
      </div>

      {historial.length === 0 ? (
        <div className="historial-vacio">
          <p>No hay cotizaciones guardadas.</p>
        </div>
      ) : (
        <div className="historial-content">
          <div className="boton-limpiar-wrapper">
            <button
              onClick={limpiarHistorial}
              className="boton-limpiar"
            >
              Limpiar Historial
            </button>
          </div>
          
          <div className="historial-lista">
            {historial.slice().reverse().map((item) => (
              <div key={item.id} className="historial-item">
                
                {/* Info de la cotización (izquierda) */}
                <div className="item-info">
                  <p className="item-titulo">
                    {item.tipoPropiedad} en {item.ciudad || item.provincia}
                  </p>
                  <p className="item-subtitulo">
                    {item.metros} m² · {item.fecha}
                  </p>
                </div>
                
                {/* --- SECCIÓN (DERECHA) --- */}
                {/* Contiene el precio y el botón de eliminar */}
                <div className="item-derecha">
                  <div className="item-precio">
                    <p>${item.precioTotal.toLocaleString('es-AR')}</p>
                  </div>
                  <div className="item-acciones">
                    <button 
                      onClick={() => eliminarCotizacion(item.id)} 
                      className="item-delete-boton"
                      title="Eliminar cotización"
                    >
                      &times;
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Historial;
