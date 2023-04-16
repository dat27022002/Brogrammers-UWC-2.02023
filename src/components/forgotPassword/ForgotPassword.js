import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgotPassword.css'

const EmailSent = () => {

  const navigate = useNavigate();
  const resendEmail = () => {
    navigate(0);
  }

  return (
    <>
    <div className="login-2">
      <h1>Email sent.</h1>
      <p style={{marginTop: "30px", marginBottom: "30px"}}>If the email you entered is valid, you should receive an email with a link to reset your password shortly. Check your <strong>"Spam"</strong> folder if you can't see the email.</p>
      <h6>Did not receive the email?</h6>
      <div className="center"><button onClick={() => resendEmail()} className = "button width400px">Resend Email</button></div>
    </div>
    <div className="background-2"
    style = {{backgroundImage: `url(homeBackground.png)`}}>
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
  const resendEmail = () => {
    navigate(0);
  }

  return (
    sent ? (<EmailSent />) : (
      <>
    <div className="login-2">
    <h1>Forgot password</h1>
    <p style={{marginTop: "30px", marginBottom: "30px"}}>Enter your email below. You will receive a email with a link to reset your password.</p>
    
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
  <div className="background-2"
  style = {{backgroundImage: `url(homeBackground.png)`}}>
  </div>
  </>
  )

  )
}

export default ForgotPassword
