import React, { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext';
import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css'
const Navbar = () => {

  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
    navigate(0);
  }
//Green underline

React.useEffect(() => {
  const tmp = document.getElementById(window.location.pathname);
  if (tmp)
    tmp.style.textDecoration = 'underline #53C351';
}, [])

//-----------------


  return (
    <div>
      <div className="navlinks-container">
          <NavLink to="/">
            <img className= 'logo-container f-left' src="https://seeklogo.com/images/R/recycle-logo-546BB839BA-seeklogo.com.jpg" alt="Logo here" />
          </NavLink>
          <NavLink to="/emp-list" id = '/emp-list' className = "navlinks-item">Employee</NavLink>
          <NavLink to="/mcps" id = '/mcps' className = "navlinks-item">MCP</NavLink>
          <NavLink to="/vehicles/trucks" id = '/vehicles/trucks' className = "navlinks-item">Vehicle</NavLink>
          <NavLink to="/assign" id = '/assign' className = "navlinks-item">Assign task</NavLink>
          <NavLink to="/chat" id = '/chat' className = "navlinks-item">Chat</NavLink>
          
          <button onClick={handleLogout} className = 'f-right logo-container rounded-button'><i className="fa-sharp fa-solid fa-power-off"></i></button>
          <NavLink to="/profile"><img className= 'logo-container f-right' src={user.avatar} alt="User avatar"/></NavLink>
          <p className = 'navlinks-item f-right'>Hello, {user.firstName}</p>
      </div>
      <div style = {{height: '71.5px'}}></div> {/*Để navbar không ghi đè lên element */}
    </div>
  )
}

export default Navbar;
