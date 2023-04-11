

import React, { useState } from "react";
import { validateLogin } from "../../controller/controller";
import { useNavigate } from "react-router-dom";

import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ERROR_MESSAGE = "Invalid login credentials! Please try again.";

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const {user, status} = validateLogin(username, password);
    if (status) {
      setUsername("");
      setPassword("");
      localStorage.setItem("userId", user.id);
      navigate("/");
      navigate(0);
      return;
    } else {
      setErrorMessage(ERROR_MESSAGE);
    }
  };
  const handleTogglePassword = () => {
    const psw = document.getElementById("passwordInput");
    const togglePsw = document.getElementById("togglePassword");

    if (psw.type == "password") psw.type = "text";
    else psw.type = "password";

    if (togglePsw.className == "far fa-eye-slash") togglePsw.className = "far fa-eye";
    else togglePsw.className = "far fa-eye-slash";

  }

  return (
    <>
    <div className="login">
      <div className="center" style={{marginTop: "20px"}}><h1>Login</h1></div>
      <form onSubmit={(e) => handleLoginSubmit(e)}>
        <label htmlFor="usernameInput">Username</label>
        <div className="center">
        <input
          required
          type="text"
          id="usernameInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className = "input width400px"
        /></div>
        <label htmlFor="passwordInput">Password</label>
        <input
          required
          type="password"
          id="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className = "input"
        />
        <button className="toggle-password" onClick={handleTogglePassword} type="button">
          <i className="far fa-eye-slash" id="togglePassword"/>
        </button>
        {errorMessage ? <p className = "error-message">{errorMessage}</p> : null}
        
        <div className="center">Forgot your password? <a href="/forgot" class = "link">Reset password</a></div>
        
        <div className="center"><button type="submit" className = "button"><h2>Login</h2></button></div>
      </form>
    </div>

    <div className="background-2"
    style = {{backgroundImage: `url(homeBackground.png)`}}>
    </div>
    </>
  );
};

export default Login;


