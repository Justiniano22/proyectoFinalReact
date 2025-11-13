// 1. Definimos las props que el componente recibirá
type InputNumberProps = {
    value: number;
    onChange: (newValue: number) => void;
    min?: number;
    max?: number;
    placeholder?: string;
    className?: string;
    id?: string; // Hacemos 'id' opcional
    disabled?: boolean;
};

const InputNumber = ({ value, onChange, ...restProps }: InputNumberProps) => {

  // 2. Este manejador convierte el valor del input (que es string) a número
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = e.target.valueAsNumber;

    // Si es NaN (campo vacío), pasamos 0 al padre.
    // Si no, pasamos el número.
      onChange(isNaN(num) ? 1 : num);
    };

    return (
        <input
        type="number"
        value={value}
        onChange={handleOnChange}
        {...restProps} // Pasa props como min, max, placeholder, className
        className={`border p-2 ${restProps.className || ''}`} 
        />
    );
};

export default InputNumber;