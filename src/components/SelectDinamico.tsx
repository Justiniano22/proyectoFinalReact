// 1. Definimos el TIPO de las props que RECIBE
type Opcion = {
    id: string | number;
    nombre: string;
};

type SelectProps = {
    opciones: Opcion[]; // Espera un array de objetos Provincia
    placeholder: string;   // El texto inicial (ej. "Elegí una provincia")
    valorActual?: string;    // El valor seleccionado (para controlarlo desde fuera)
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    id?: string; // Hacemos 'id' opcional
    disabled?: boolean;
};

const SelectDinamico = ({ 
    opciones, 
    placeholder, 
    valorActual, 
    onChange, 
    id,         // <-- Recibimos la id
    disabled  // <-- Recibimos disabled
    }: SelectProps) => {
    return (
        <select 
        id={id} // <-- Usamos la id aquí
        value={valorActual} 
        onChange={onChange}
        disabled={disabled} // <-- Usamos disabled aquí
        >
        <option value="">-- {placeholder} --</option>
        
        {opciones.map((op) => (
            <option key={op.id} value={op.nombre}> 
            {op.nombre}
            </option>
        ))}
        </select>
    );
};

export default SelectDinamico;