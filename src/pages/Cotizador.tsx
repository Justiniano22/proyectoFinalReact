// Importaciones
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SelectDinamico from '../components/SelectDinamico'; 
import InputNumerico from '../components/InputNumerico';
import { getPrecioPorM2 } from '../pricingEngine';
import { type CotizacionGuardada } from './Historial';
import './Cotizador.css';

type Opcion = {
    id: string | number;
    nombre: string;
};

const API_BASE_URL = "https://apis.datos.gob.ar/georef/api/v2.0";

const opcionesTipoPropiedad = [
    { id: 1, nombre: "Casa" },
    { id: 2, nombre: "Departamento" },
    { id: 3, nombre: "Local Comercial" },
    { id: 4, nombre: "Terreno" },
    { id: 5, nombre: "Oficina" },
    { id: 6, nombre: "Deposito de Logística" },
    { id: 7, nombre: "Barrio Privado" },
];

function Cotizador() {
    const [provincias, setProvincias] = useState<Opcion[]>([]);
    const [ciudades, setCiudades] = useState<Opcion[]>([]);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
    const [cargandoProvincias, setCargandoProvincias] = useState(true);
    const [cargandoCiudades, setCargandoCiudades] = useState(false);
    const [metrosCuadrados, setMetrosCuadrados] = useState(50);
    const [precioPorM2, setPrecioPorM2] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [tipoPropiedad, setTipoPropiedad] = useState("");
    const navigate = useNavigate();

    // --- LÓGICA DE FETCHING Y CÁLCULO ---
    useEffect(() => {
        const fetchProvincias = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/provincias`);
                const data = await response.json();
                setProvincias(data.provincias);
            } catch (error) { console.error("Error al cargar las provincias:", error); } 
            finally { setCargandoProvincias(false); }
        };
        fetchProvincias();
    }, []);

    useEffect(() => {
        if (!provinciaSeleccionada) {
            setCiudades([]); 
            return;
        }
        const fetchCiudades = async () => {
            setCargandoCiudades(true); 
            setCiudadSeleccionada(""); 
            let endpoint = 'municipios'; 
            let dataKey = 'municipios';   
            if (provinciaSeleccionada === "Ciudad Autónoma de Buenos Aires") {
                endpoint = 'localidades';
                dataKey = 'localidades';
            }
            try {
                const url = `${API_BASE_URL}/${endpoint}?provincia=${encodeURI(provinciaSeleccionada)}&max=500`;
                const response = await fetch(url);
                const data = await response.json();
                setCiudades(data[dataKey] || []); 
            } catch (error) { console.error(`Error al cargar las ${dataKey}:`, error); } 
            finally { setCargandoCiudades(false); }
        };
        fetchCiudades();
    }, [provinciaSeleccionada]); 

    useEffect(() => {
        const precioBase = getPrecioPorM2(provinciaSeleccionada, tipoPropiedad);
        const total = precioBase * metrosCuadrados;
        setPrecioPorM2(precioBase);
        setPrecioTotal(total);
    }, [provinciaSeleccionada, tipoPropiedad, metrosCuadrados]); 

    const handleGuardarCotizacion = () => {
        if (precioTotal <= 0 || !provinciaSeleccionada || !tipoPropiedad) {
            alert("Por favor, completa todos los campos para guardar.");
            return;
        }
        
        const nuevaCotizacion: CotizacionGuardada = {
            id: new Date().toISOString(),
            fecha: new Date().toLocaleString('es-AR'),
            provincia: provinciaSeleccionada,
            ciudad: ciudadSeleccionada,
            tipoPropiedad: tipoPropiedad,
            metros: metrosCuadrados,
            precioTotal: precioTotal,
        };
        const historialGuardado = localStorage.getItem('cotizaciones');
        const historial: CotizacionGuardada[] = historialGuardado ? JSON.parse(historialGuardado) : [];
        historial.push(nuevaCotizacion);
        localStorage.setItem('cotizaciones', JSON.stringify(historial));
        alert("¡Cotización guardada!");
        navigate('/historial');
    };

    return (
        <div className="cotizador-container">
            <div className="cotizador-card">
                
                <div className="cotizador-header">
                    <h1>Cotizador de Propiedades</h1>
                    <p>Calcula el valor estimado de tu propiedad al instante.</p>
                </div>

                <form className="cotizador-form" onSubmit={(e) => e.preventDefault()}>
                    
                    <div className="form-section">
                        {/* Provincia */}
                        <div className="form-group">
                            <label htmlFor="provincia">Provincia</label>
                            <SelectDinamico
                                id="provincia"
                                placeholder="Elegí una provincia"
                                opciones={provincias}
                                valorActual={provinciaSeleccionada}
                                onChange={(e) => setProvinciaSeleccionada(e.target.value)}
                            />
                            {cargandoProvincias && <p className="loading-text">Cargando provincias...</p>}
                        </div>

                        {/* Ciudad / Localidad */}
                        <div className="form-group">
                            <label htmlFor="ciudad">Ciudad / Localidad</label>
                            <SelectDinamico
                                id="ciudad"
                                placeholder="Elegí una ciudad"
                                opciones={ciudades}
                                valorActual={ciudadSeleccionada}
                                onChange={(e) => setCiudadSeleccionada(e.target.value)}
                                disabled={!provinciaSeleccionada || cargandoCiudades}
                            />
                            {cargandoCiudades && <p className="loading-text">Cargando ciudades...</p>}
                        </div>
                    </div>

                    <div className="form-section">
                        {/* Tipo de Propiedad */}
                        <div className="form-group">
                            <label htmlFor="tipo-propiedad">Tipo de Propiedad</label>
                            <SelectDinamico
                                id="tipo-propiedad"
                                placeholder="Elegí un tipo de propiedad"
                                opciones={opcionesTipoPropiedad}
                                valorActual={tipoPropiedad}
                                onChange={(e) => setTipoPropiedad(e.target.value)}
                            />
                        </div>

                        {/* Metros Cuadrados */}
                        <div className="form-group">
                            <label htmlFor="metros">Metros Cuadrados (m²)</label>
                            <InputNumerico
                                id="metros"
                                value={metrosCuadrados}
                                onChange={setMetrosCuadrados}
                                min={10}
                            />
                        </div>
                    </div>

                    {/* --- RESULTADO DE LA COTIZACIÓN --- */}
                    {provinciaSeleccionada && tipoPropiedad && metrosCuadrados > 0 && (
                        <div className="resultado-box">
                            <h3>Cotización Estimada</h3>
                            
                            <div className="precio-linea">
                                <span>Valor por m²:</span>
                                <span>${precioPorM2.toLocaleString('es-AR')}</span>
                            </div>
                            
                            <div className="total-linea">
                                <span className="total-label">Precio Total:</span>
                                <span className="total-valor">${precioTotal.toLocaleString('es-AR')}</span>
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleGuardarCotizacion}
                        disabled={precioTotal <= 0 || !provinciaSeleccionada || !tipoPropiedad}
                        className="boton-guardar"
                    >
                        Guardar Cotización
                    </button>
                </form>

                <div className="link-historial">
                    <Link to="/historial">
                        Ver historial de cotizaciones
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cotizador;