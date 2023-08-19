import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import TextInput from "../../textInput/Index";
import MyButton from "../../button";
import Logo from "../../../assets/logo";
import "./styles.css"
// import axios from "axios";

const LoginForm = () => {
    localStorage.clear()
    // const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleDataChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = async ()=>{
        // if(data.email && data.password){
        //     try{
        //         const response = await axios.post("http://127.0.0.1:8000/api/login", data)
        //         const message = response.data.message
        //         if (message==='logged in successfully'){
        //             localStorage.setItem("token", response.data.user.token)
        //             navigate("/home")
        //             }
        //         }catch(e){
        //             const login_btn = document.getElementById("login-btn")
        //             login_btn.innerHTML = 'Failed'
        //             login_btn.style.backgroundColor = 'rgb(255, 109, 109)'
        //             setTimeout(() => { 
        //                 login_btn.innerHTML = 'Log in' 
        //                 login_btn.style.backgroundColor = 'rgb(109, 160, 255)'
        //             }, 3000)
        //         }
        //     }
        }
    
    return (
        <div className="login-form-container ">
            <div className="login-logo-container">
                <Logo className={"login-form-logo"}/>
            </div>

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
                placeholder={"Enter Your Password"}
                onChange={handleDataChange}
            />
            <div className="login-btn-div">
                <MyButton 
                id="login-btn" 
                onClick={handleSubmit} 
                label={'Login'}
                styles={{width: "150px", fontSize:"1rem"}}
                ></MyButton>
            </div>
            
            <span>Don't have an account? <br/><span className="register-link">Register here!</span>  </span>
        </div>
    );
};

export default LoginForm;
