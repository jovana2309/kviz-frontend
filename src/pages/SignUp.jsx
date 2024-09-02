import "./Auth.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import TitleWithBackButton from "../components/TitleWithBackButton";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();

  async function handleSignUpClick(event) {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/signup", {
        email,
        lozinka: password,
        ime: name,
        prezime: surname,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }

  return (
    <>
      <TitleWithBackButton title="Sign Up" />
      {error && error}
      <div className="container">
        <div className="login-form">
          <form>
            <div className="form-group">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
                placeholder="Enter your surname"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
