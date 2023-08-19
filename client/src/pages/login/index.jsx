import AnimatedChef from "../../assets/animated/chef";
import Logo from "../../assets/logo";
import LoginForm from "../../components/forms/login";
import "./styles.css"

const LoginPage = () => {
    return ( 
        <>
        <div className="login-page-body">
            <div className="login-page-left-container">
                
                <div className="animated-chef-container">
                    <AnimatedChef/>
                </div>
                
            </div>
            <div className="login-page-right-container">
                <LoginForm/>
            </div>

        </div>
        

        
        </>
        
     );
}
 
export default LoginPage;