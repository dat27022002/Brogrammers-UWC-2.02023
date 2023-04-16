import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import api from '../../model/api/api';
import './employeesList.css';
import { NavLink } from "react-router-dom";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

const EmployeesList = () => {
  const calTask = (id) => {
    const allTask = api.ActivityAPI.all();
    const employeeTasks = allTask.filter((value, index) => {
      return value.employeesId.includes(id);
    })
    return employeeTasks.length;
  }

  const [reverse, setReverse] = useState([false, false, false]);
  const [showMenu, setShowMenu] = useState(false);
  const [employeeId, setEmployeeId] = useState(0);
  const [employees, setEmployees] = useState(() => {
    const allEmployees = [...api.CollectorAPI.all(), ...api.JanitorAPI.all()];
    return allEmployees.map((value, index) => {
      value["numberOfTasks"] = calTask(value.id);
      return value;
    })
  });

  const HandleOnShow = (id) => {
    setShowMenu(true);
    setEmployeeId(id);
  }

  const HandleOnHide = () => {
    setShowMenu(false);
    setEmployeeId(0);
  }

  const HandleOnSort = (property, idx) => {
    const sortedArray = [...employees].sort(function (a, b) {
      var x = a[property]; var y = b[property];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    if (reverse[idx]) sortedArray.reverse();
    const newReverse = [false, false, false]
    newReverse[idx] = !reverse[idx]
    setReverse(newReverse)
    setEmployees(sortedArray);
  }


  return (
    <>
      <Navbar />
      <>
        <div className='title border-bottom-gray'><h1>Employees</h1></div>
        
        
          <table id = 'employee-table' className='table'>
            <tbody>
              <tr>
                <th className='table-item' style={{width: "10%"}}></th>
                <th className='table-item' style={{width: "20%"}}>
                  UserName
                  <span onClick={() => HandleOnSort("username", 0)} className="filter-button">
                    {reverse[0] ? 
                      <i class="fa-solid fa-chevron-up"/> : <i class="fa-solid fa-chevron-down"/>}
                  </span>
                </th>
                <th className='table-item' style={{width: "10%"}}>Dept</th>
                <th className='table-item' style={{width: "10%"}}>
                  Status
                  <span onClick={() => HandleOnSort("status", 1)} className="filter-button">
                    {reverse[1] ? <i class="fa-solid fa-chevron-up"/> : <i class="fa-solid fa-chevron-down"/>}
                  </span>
                </th>
                <th className='table-item' style={{width: "10%"}}>
                  Number of tasks
                  <span onClick={() => HandleOnSort("numberOfTasks", 2)} className="filter-button">
                    {reverse[2] ? <i class="fa-solid fa-chevron-up"/> : <i class="fa-solid fa-chevron-down"/>}
                  </span>
                </th>
                <th className='table-item' style={{width: "10%"}}></th>
              </tr>
              {!employees.length ? <></> :
                employees.map((value, index) => {
                  return (
                  <tr key={value.id} className = "table-item center">
                    <td className='table-item background-white'><img className = "rounded-image-small" src={value.avatar} alt='avt'></img></td>
                    <td className='table-item'>{value.username}
                    </td>
                    <td className='table-item'>{value.position ? "Collector" : "Janitor"}</td>
                    <td className={!value.status ? 'table-item text-green' : 'table-item text-red'}>{!value.status ? 
            (<div className='available-container'><span className='dot'></span>Available</div>) : 
            (<div className='unavailable-container'><span className='dot-2'></span>Unavailable</div>)}</td>
                    <td className='table-item'>{value.numberOfTasks}</td>
                    <td className='table-item' style={{cursor: "pointer"}}>
                      {(showMenu && employeeId === value.id) ? (<div>
                        <div onClick={() => HandleOnHide()}>...</div>
                        <br/>
                        <NavLink to={"/chat/" + employeeId} className = "link-2">Chat</NavLink>
                        <NavLink to={"/emp-info/" + employeeId} className = "link-2">Profile</NavLink>
                      </div>) : <div onClick={() => HandleOnShow(value.id)}>...</div>}
                    </td>  
                  </tr>

                  )
                })}
            </tbody>
          </table>
        
      </>
    </>

  )
}

export default EmployeesList;
