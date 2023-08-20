import "./styles.css"

const MyButton = ({ label, onClick, styles, id }) => {
    return (
        <div className="myButton-container">
            <button 
                id={id}
                onClick={onClick}
                className="myButton transition"
                style={styles}>
                {label}
            </button>
        </div>
    );
}

export default MyButton;