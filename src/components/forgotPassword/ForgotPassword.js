import React, { useContext, useState } from 'react'
import GlobalContext from '../../context/GlobalContext'
import {useNavigate} from "react-router-dom";
import './forgotPassword.css'

const EmailSent = () => {

  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = () => {
    if (oldPassword !== "1234"){
      setErrorMessage("Wrong OTP!")
      setMessage("")
    } else if (newPassword.length < 4){
      setErrorMessage("New password must be longer than 4 characters!")
      setMessage("")
    } else if (newPassword !== newPasswordAgain) {
      setErrorMessage("Passwords don't match!")
      setMessage("")
    } else {
      setErrorMessage("")
      setMessage("Password changed successfully!")
    }
  }

  return (
    <>
    <div className="login-2">
      <h1 style={{marginBottom:'20px', display: 'flex', justifyContent: 'center'}}>Reset password</h1>

        <p>New password:</p>
        <input
          className="change-password-grid-item"
          type="password"
          required min="4"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} />
        <p>Confirm new password:</p>
        <input
          className="change-password-grid-item"
          type="password"
          placeholder="Retype new password"
          value={newPasswordAgain}
          onChange={(e) => setNewPasswordAgain(e.target.value)} />
        <p>OTP:</p>
        <input
          className="change-password-grid-item"
          type="text"
          placeholder="OTP"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)} />
        {errorMessage === "" ?
          <p>{errorMessage}</p> :
          message === "" ? <p>{message}</p> : null
        }
        <div className="center">
          <button 
            style={{backgroundColor: '#3DA35D',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              width: '230px',
              height: '45px',
              margin: '10px 0px 10px 0px',
              padding: '0',
            }}
            onClick={() => {
            if (oldPassword !== "1234"){
              alert("Wrong OTP!")
            } else if (newPassword.length < 4){
              alert("New password must be longer than 4 characters!")
            } else if (newPassword !== newPasswordAgain) {
              alert("Passwords don't match!")
            } else {
              alert("Password changed successfully!")
              navigate(0);
            }
            console.log("em" + errorMessage)
            console.log("m" + message)
          }}>Submit</button>
        </div>
    </div>
    <div className="background-2"style = {{backgroundImage: `url(homebg.png)`}}>
        <div style={{paddingLeft: '3%', paddingTop:'1%', height: '10%', display:'flex',alignItems:'center'}}>
          <img className= 'logo-container f-left' src="logo.jpg" alt="Logo here" />
          <h1 style={{color:'white',display:'flex',alignItems:'center'}}>UWC</h1>
        </div>
      </div>
    </>
  )
}

const ForgotPassword = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSendEmail = () => {
    console.log("Email sent!");
    setSent(true);
  }

  return (
    sent ? (<EmailSent />) : (
      <>
        <div className="login-2">
        <h1 style={{ display: 'flex', justifyContent: 'center'}}>Forgot password</h1>
        <p style={{marginTop: "30px", marginBottom: "30px"}}>Enter the email address associated with your account and we'll send you a OTP code to reset your password.</p>
        <form onSubmit={(e) => handleSendEmail(e)}>
          <label htmlFor="emailInput"><b>Email</b></label>
          <input
            required
            type="email"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className = "input"
          />
          <br/>
          <div className="center"><button type="submit" className = "button width400px">Submit</button></div>
        </form>
        </div>
        <div className="background-2"style = {{backgroundImage: `url(homebg.png)`}}>
          <div style={{paddingLeft: '3%', paddingTop:'1%', height: '10%', display:'flex',alignItems:'center'}}>
            <img className= 'logo-container f-left' src="logo.jpg" alt="Logo here" />
            <h1 style={{color:'white',display:'flex',alignItems:'center'}}>UWC</h1>
          </div>
        </div>
      </>
  )

  )
}

export default ForgotPassword
