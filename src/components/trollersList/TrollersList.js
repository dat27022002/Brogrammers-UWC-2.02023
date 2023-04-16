import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import api from '../../model/api/api';
import './trollersList.css'
import { NavLink } from "react-router-dom";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";


const TrollersList = () => {
  const getNameById = (id) => {
    const allJanitor = api.JanitorAPI.all();
    const janitor = allJanitor.find((value) => {
      return value.id === id;
    })
    if (!janitor) return "-";
    return janitor.firstName + " " + janitor.lastName;
  }
  const [trollers, setTrollers] = useState(() => {
    const allTroller = api.TrollerAPI.all();
    return allTroller.map((value, index) => {
      value["userName"] = getNameById(value.uesdById);
      return value;
    })
  });
  const [reverse, setReverse] = useState([false]);

  const HandleOnSort = (property, idx) => {
    const sortedArray = [...trollers].sort(function (a, b) {
      var x = a[property]; var y = b[property];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    if (reverse[idx]) sortedArray.reverse();
    const newReverse = [false]
    newReverse[idx] = !reverse[idx]
    setReverse(newReverse)
    setTrollers(sortedArray);
  }
  return (
    <>
      <Navbar />
      <>
        <div className='title border-bottom-gray'>
          <div className='left-div'>
            <h1>Trollers</h1>
          </div>
          <div className='right-div'>
            
            <NavLink to='/vehicles/trollers' className='navlink-troller navlink-troller-left'>
              <div className='navlink-troller-container-left'>
                Trollers
              </div>
            </NavLink>
            
            <NavLink to='/vehicles/trucks' className='navlink-troller navlink-troller-right'>
              <div className='navlink-troller-container-right'>
                Trucks
              </div>
            </NavLink>
            

          </div>
        </div>
        <div className='troller-list-table-container'>
          <table id='troller-list-table'>
            <tbody>
              <tr>
                <th className='troller-list-table-header' style={{width: "10%"}}>Troller ID</th>
                <th className='troller-list-table-header' style={{width: "20%"}}>Used by</th>
                <th className='troller-list-table-header' style={{width: "20%"}}>Location</th>
                <th className='troller-list-table-header' style={{width: "10%"}}>Status
                  <span className="troller-list-filter-button" onClick={() => HandleOnSort("status", 0)}>
                    {reverse[0] ? <CaretDownFill />
                      : <CaretUpFill />}
                  </span>
                </th>
              </tr>
              {trollers.map((value, index) => {
                return (
                  <tr>
                    <td className='troller-list-table-item' style={{width: "10%"}}>{value.id}</td>
                    <td className='troller-list-table-item' style={{width: "20%"}}>{value.userName}</td>
                    <td className='troller-list-table-item' style={{width: "20%"}}>{value.location}</td>
                    <td className='troller-list-table-item' style={{width: "10%"}}>{!value.status ? <div className='troller-list-status-available'>&bull; Available</div> : <div className='troller-list-status-in-use'>&bull; In use</div>}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </>
    </>

  )
}

export default TrollersList;