import React, { useContext, useState } from 'react'
import GlobalContext from '../../context/GlobalContext'
import ChangePassword from '../changePassword/ChangePassword';
import {useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import './profile.css';

const Profile = () => {

  const navigate = useNavigate();
  
  const {formatDateToInput, user, setUser} = useContext(GlobalContext);
  const [fname, setFname] = useState(user.firstName);
  const [lname, setLname] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [bdate, setBdate] = useState(formatDateToInput(user.birthDate));
  const [id, setId] = useState(user.id);
  const [username, setUsername] = useState(user.username);
  const [memberSince, setMemberSince] = useState(formatDateToInput(user.memberSince));

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({...user, username, email, firstName: fname, lastName: lname, birthDate: bdate});
    navigate("/profile");
  }

  return (
    <>
    <Navbar />
    <main className="container">
      <div className="image-name-container">
        <img className='image-container'src={user.avatar} alt="Back officer avatar" />
        <div>
          <h3>{`${user.firstName} ${user.lastName}`}</h3>
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="form-container">
        <div className='form-grid-container'>

          <label className='form-grid-item' htmlFor="firstNameInput">First name</label>
          <input className='form-grid-item' type="text" id="firstNameInput" required value={fname} onChange={(e) => setFname(e.target.value)} />

          <label className='form-grid-item' htmlFor="lastNameInput">Last name</label>
          <input className='form-grid-item' type="text" id="lastNameInput" required value={lname} onChange={(e) => setLname(e.target.value)} />

          <label className='form-grid-item' htmlFor="emailInput">Email</label>
          <input className='form-grid-item' type="email" id="emailInput" required value={email} onChange={(e) => setEmail(e.target.value)} />

          <label className='form-grid-item' htmlFor="bdateInput">Birth date</label>
          <input className='form-grid-item' type="date" id="bdateInput" required value={bdate} onChange={(e) => setBdate(e.target.value)} />

          <label className='form-grid-item' htmlFor="idInput">ID</label>
          <input className='form-grid-item' type="text" id="idInput" required disabled value={id} />

          <label className='form-grid-item' htmlFor="usernameInput">Username</label>
          <input className='form-grid-item' type="text" id="usernameInput" required value={username} onChange={(e) => setUsername(e.target.value)} />

          <label className='form-grid-item' htmlFor="memberSinceInput">Member since</label>
          <input className='form-grid-item' type="date" id="memberSinceInput" required disabled value={memberSince} />

          <div className='form-grid-item'></div>
          <div className='form-grid-item'>
            <div className='form-button-container'>
              <button className='form-button' type="submit">Save changes</button>
            </div>
          </div>
        </div>
        <ChangePassword />
      </form>
    </main>
    </>
  )
}

export default Profile