import "./styles.css"

const MyButton = ({ label, onClick, styles }) => {
    return (
        <div className="myButton-container">
            <button 
                onClick={onClick}
                className="myButton transition"
                style={styles}>
                {label}
            </button>
        </div>
    );
}

export default MyButton;