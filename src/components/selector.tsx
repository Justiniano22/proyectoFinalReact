type opcionesProps = {
    opciones: string;
}; 


const Selector = ({opciones}: opcionesProps) => {
    return (
        <div>
            <h1>¡Hola, {opciones}!</h1>
            {opciones && <p>Tu edad es: {opciones}</p>}
            <select name="selectPropiedad" id="">
            <option value="">--Please choose an option--</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
            </select>
        </div>
    );
};

export default Selector;