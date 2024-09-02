
import {useState, useEffect} from 'react'
import TitleWithBackButton from '../components/TitleWithBackButton';
import axiosInstance from '../services/axios';
import "./Auth.css";
import {Link,useNavigate} from "react-router-dom"
import "./SignUp.jsx";

const Login = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  async function handleLoginClick(event) {
    event.preventDefault(); 
    try {
            const response = await axiosInstance.post("/login", {
                email,lozinka: password
            })
            const token = response.data.token;
            if (token) { 
                localStorage.setItem('authToken', token);
                navigate("/");
            }
          } catch (error) {
            console.log(error)
            setError(error.response.data.message);
            setTimeout(() => {
              setError(false);
            },5000);
          } 
   
  }
return ( 
    <>
    <TitleWithBackButton title="Login" />
    {error && error}
    <div className="container">
<div className="login-form">
    
    <form>
        <div className="form-group">
            
            <input type="text" onChange={e => setEmail(e.target.value)} value = {email} placeholder="Enter your email" required />
        </div> 
        <div className="form-group">
            
            <input type="password" onChange={e => setPassword(e.target.value)} value = {password} placeholder="Enter your password" required />
        </div>
        <button type="submit" onClick={handleLoginClick}>Login</button>
        <p className="signup-link">Don't have an account yet? <a href="/SignUp">Sign Up</a></p>
    </form>
</div>
</div>
</>
 )
}

export default Login;