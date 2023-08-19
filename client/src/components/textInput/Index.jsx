import "./styles.css"

const TextInput = ({ label, name, type, placeholder, value, onChange }) => {
    return (
        <div className="text-input-container">
            <label className="text-input-label">{label}</label>
            <input 
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="text-input transition">
            </input>
        </div>
    );
}

export default TextInput;