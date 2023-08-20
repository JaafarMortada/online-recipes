import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import TextInput from "../../textInput/Index";
import MyButton from "../../button";
import Logo from "../../../assets/logo";
import "./styles.css"
import { sendRequest } from "../../../config/request";

const RegistrationForm = ( { toggleForms } ) => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        ver_password: ""
    })

    const handleDataChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate()
    const handleSubmit = async () => {
        const register_btn = document.getElementById("register-btn")
        register_btn.innerHTML = 'Registering...'
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/register",
                includeHeaders: false,
                body: data,
            });
            if(response.message === "User created successfully"){
                register_btn.innerHTML = 'success'
                localStorage.setItem('token', response.user.token)
                localStorage.setItem('name', response.user.name)
                navigate('/home')
            } else {
                
                register_btn.innerHTML = 'Failed'
                register_btn.style.backgroundColor = 'rgb(255, 109, 109)'
                setTimeout(() => { 
                    register_btn.innerHTML = 'Register' 
                    register_btn.style.backgroundColor = 'rgb(247, 129, 91)'
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            register_btn.innerHTML = 'Try Again'
        }}
    
    return (
        <div className="register-form-container rotate-form ">
            <div className="register-logo-container">
                <Logo className={"register-form-logo"}/>
            </div>

            <TextInput
                name = {"name"}
                label={"Enter Your Name:"}
                type={"text"}
                value={data.name}
                placeholder={"Enter Your name"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"email"}
                label={"Enter Your E-mail:"}
                type={"email"}
                value={data.email}
                placeholder={"Enter Your E-mail"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"password"}
                label={"Enter Your Password:"}
                type={"password"}
                value={data.password}
                placeholder={"Enter Your password"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"ver_password"}
                label={"Verify Your Password:"}
                type={"password"}
                value={data.ver_password}
                placeholder={"Verify your password"}
                onChange={handleDataChange}
            />
            <div className="register-btn-div">
                <MyButton 
                id={"register-btn"}
                onClick={handleSubmit} 
                label={'Register'}
                styles={{width: "150px", fontSize:"1rem"}}
                ></MyButton>
            </div>
            
            <span>Already have an account? <br/><span className="login-link" onClick={toggleForms}>Login here!</span>  </span>
        </div>
    );
};

export default RegistrationForm;
