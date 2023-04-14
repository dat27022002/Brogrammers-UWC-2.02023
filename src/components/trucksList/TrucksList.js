import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import api from '../../model/api/api';
import './trucksList.css'
import { NavLink } from "react-router-dom";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

const TrucksList = () => {
  const [reverse, setReverse] = useState([false]);
  const getNameById = (id) => {
    const allCollector = api.CollectorAPI.all();
    const collector = allCollector.find((value) => {
      return value.id === id;
    })
    if (!collector) return "-";
    return collector.firstName + " " + collector.lastName;
  }
  const [trucks, setTrucks] = useState(() => {
    const allTruck = api.TruckAPI.all();
    return allTruck.map((value, index) => {
      value["userName"] = getNameById(value.uesdById);
      return value;
    })
  });
  const HandleOnSort = (property, idx) => {
    const sortedArray = [...trucks].sort(function (a, b) {
      var x = a[property]; var y = b[property];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    if (reverse[idx]) sortedArray.reverse();
    const newReverse = [false]
    newReverse[idx] = !reverse[idx]
    setReverse(newReverse)
    setTrucks(sortedArray);
  }
  return (
    <>
      <Navbar />
      <>
      <div className='title border-bottom-gray'>
          <div className='left-div'>
            <h1>Trucks</h1>
          </div>
          <div className='right-div'>
            <NavLink to='/vehicles/trollers' className='navlink-truck navlink-truck-left'>
              <div className='navlink-truck-container-left'>
                Trollers
              </div>
            </NavLink>
            <NavLink to='/vehicles/trucks' className='navlink-truck navlink-truck-right'>
              <div className='navlink-truck-container-right'>
                Trucks
              </div>
            </NavLink>
          
          </div>
        </div>
        <div className='truck-list-table-container'>
          <table id='truck-list-table'>
            <tbody>
              <tr>
                <th className='truck-list-table-header' style={{width: "10%"}}>Truck ID</th>
                <th className='truck-list-table-header' style={{width: "20%"}}>Used by</th>
                <th className='truck-list-table-header' style={{width: "20%"}}>Location</th>
                <th className='truck-list-table-header' style={{width: "10%"}}>Status
                  <span className="truck-list-filter-button" onClick={() => HandleOnSort("status", 0)}>
                    {reverse[0] ? <CaretDownFill />
                      : <CaretUpFill />}
                  </span>
                </th>
              </tr>
              {trucks.map((value, index) => {
                return (
                  <tr>
                    <td className='truck-list-table-item' style={{width: "10%"}}>{value.id}</td>
                    <td className='truck-list-table-item' style={{width: "20%"}}>{value.userName}</td>
                    <td className='truck-list-table-item' style={{width: "20%"}}>{value.location}</td>
                    <td className='truck-list-table-item' style={{width: "10%"}}>{!value.status ? <div className='truck-list-status-available'>&bull; Available</div> : <div className='truck-list-status-in-use'>&bull; In use</div>}</td>
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

export default TrucksList;