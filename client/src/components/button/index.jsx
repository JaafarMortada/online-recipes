import "./styles.css"

const MyButton = ({ label, onClick }) => {
    return (
        <div className="myButton-container">
            <button 
                onClick={onClick}
                className="myButton transition">
                {label}
            </button>
        </div>
    );
}

export default MyButton;