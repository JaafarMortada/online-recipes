import { useState, useCallback } from "react";
import AnimatedChef from "../../assets/animated/chef";
import Logo from "../../assets/logo";
import LoginForm from "../../components/forms/login";
import RegistrationForm from "../../components/forms/register";
import "./styles.css"

const LoginPage = () => {

    const [showLoginForm, setShowLoginForm] = useState(true)

    const toggleForms = useCallback(() => {
        setShowLoginForm(prevValue => !prevValue);
      }, []);
    return ( 
        <>
        <div className="login-page-body">
            <div className="login-page-left-container">
                
                <div className="animated-chef-container">
                    <AnimatedChef/>
                </div>
                
            </div>
            <div className="login-page-right-container">
                { showLoginForm ? <LoginForm toggleForms={toggleForms} toggle={showLoginForm}/> : <RegistrationForm toggleForms={toggleForms} toggle={showLoginForm}/>}
                
            </div>

        </div>
        

        
        </>
        
     );
}
 
export default LoginPage;