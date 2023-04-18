import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../model/api/api'
import Navbar from '../navbar/Navbar'
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import "./employeeProfile.css"

const EmployeeProfile = () => {
  const navigate = useNavigate()
  const [id] = useState(useParams().id);
  const [employee] = useState(api.CollectorAPI.get_by_id(id) || api.JanitorAPI.get_by_id(id));
  const [reverse, setReverse] = useState([false]);
  const getMCPNameById = (id, allMCP) => {
    for (let i = 0; i < allMCP.length; i++)
      if (allMCP[i]["id"] === id)
        return allMCP[i]["name"];
  }
  const [tasks, setTasks] = useState(() => {
    const allTask = api.ActivityAPI.all();
    const allMCP = api.mcpAPI.all();
    const employeeTasks = allTask.filter((value, index) => {
      return value.employeesId.includes(id);
    })
    return employeeTasks.map((value, index) => {
      const route = api.RouteAPI.get_by_id(value.routeId);
      value["firstMCP"] = getMCPNameById(route.MCPIdList[0], allMCP);
      value["lastMCP"] = getMCPNameById(route.MCPIdList.at(-1), allMCP);
      return value;
    })
  })


  const HandleOnSort = (property, idx) => {
    const sortedArray = [...tasks].sort(function (a, b) {
      var x = a[property]; var y = b[property];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    if (reverse[idx]) sortedArray.reverse();
    const newReverse = [...reverse]
    newReverse[idx] = !reverse[idx]
    setReverse(newReverse)
    setTasks(sortedArray);
  }

  return (
    <>
      <Navbar></Navbar>
      <>
        <div className = "title"><h1>List of tasks </h1></div>
        <div className = 'container-2 border-blue'>
          <div className = 'profile-image center'>
            <img className = 'rounded-image-medium' src={employee.avatar} alt='avt'/>
          </div>
          <div className = 'profile-text'>
            <h2>{`${employee.firstName} ${employee.lastName}`}</h2>
            <p><b>@{employee.username}</b></p>
            <p>{!employee.status ? 
            (<div className='available-container'><span className='dot'></span>Available</div>) : 
            (<div className='unavailable-container'><span className='dot-2'></span>Unavailable</div>)}</p>
            
            </div>
            <div className = 'profile-text-2'>
            <p>Position: {employee.position ? "Collector" : "Janitor"}</p>
            <br/>
            <p>Member since {employee.memberSince}</p>
          </div>
        </div>
        <table className = 'table-2'>
          <tbody>
            <tr>
              <th className = 'table-item-2'>
                RouteID
                <span onClick={() => HandleOnSort("routeId", 0)}>
                  {reverse[0] ? <CaretDownFill />
                    : <CaretUpFill />}
                </span>
              </th>
              <th className = 'table-item-2'>First MCP</th>
              <th className = 'table-item-2'>Last MCP</th>
              <th className = 'table-item-2'>Time completed</th>
              {/* <th className = 'table-item'>Status</th> */}
              <th />
            </tr>
            {!tasks.length ? <></> :
              tasks.map((value, index) => {
                return (<tr key={value.id}>
                  <td className = 'table-item-2 center'>{value.routeId}</td>
                  <td className = 'table-item-2 center'>{value.firstMCP}</td>
                  <td className = 'table-item-2 center'>{value.lastMCP}</td>
                  <td className = 'table-item-2 center'>{value.timestamp}</td>
                </tr>)
              })}
          </tbody>
        </table>
      </>
    </>
  )

}

export default EmployeeProfile;
