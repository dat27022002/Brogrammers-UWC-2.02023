import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import api, { mcpAPI } from '../../model/api/api';
import './mcpsList.css'
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";



const MCPsList = () => {
  const [MCPs, setMCPs] = useState(api.mcpAPI.all());
  const [onlyFull, setOnlyFull] = useState(false)
  const [reverse, setReverse] = useState([false, false, false]);

  const HandleOnSort = (property, idx) => {
    const sortedArray = [...MCPs].sort(function (a, b) {
      var x = a[property]; var y = b[property];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    if (reverse[idx]) sortedArray.reverse();
    const newReverse = [false]
    newReverse[idx] = !reverse[idx]
    setReverse(newReverse)
    setMCPs(sortedArray);
  }

  const HandleOnFilterFull = () => {
    setOnlyFull(!onlyFull);

    if (onlyFull) {
      try {
        if (!api.mcpAPI.has_property('percentage')) return;
        setMCPs(api.mcpAPI.filter({ "percentage": 100 }));
      } catch (error) {
        setMCPs([]);
      }
    } else {
      setMCPs(api.mcpAPI.all())
    }
  }
  console.log(MCPs)

  return (
    <>
      <Navbar />
      <>
        <div className='title border-bottom-gray'>
          <h1>MCPs list</h1>
        </div>
        <div className='mcp-list-table-container'>
          <table id='mcp-table' className='mcp-list-table'>
            <tbody>
              <tr>
                <th className='mcp-list-table-header' style={{width: "10%"}}>MCP ID</th>
                <th className='mcp-list-table-header' style={{width: "20%"}}>MCP name</th>
                <th className='mcp-list-table-header' style={{width: "10%"}}>Capacity
                  <span className='mcp-table-filter-button' onClick={() => HandleOnSort("percentage", 0)}>
                    {reverse[0] ? <CaretDownFill />
                      : <CaretUpFill />}
                  </span>
                </th>
                <th className='mcp-list-table-header' style={{width: "20%"}}>Last visited</th>
              </tr>
              {MCPs.map((value, index) => {
                return (
                  <tr>
                    <td className='mcp-list-table-item' style={{width: "10%"}}>{value.id}</td>
                    <td className='mcp-list-table-item' style={{width: "20%"}}>{value.name}</td>
                    {value.percentage <= 40 ?
                      <td className='mcp-list-table-item first-level' style={{width: "10%"}}>{value.percentage}%</td> :
                      value.percentage <= 60 ?
                        <td className='mcp-list-table-item second-level' style={{width: "10%"}}>{value.percentage}%</td> :
                        value.percentage <= 80 ?
                          <td className='mcp-list-table-item third-level' style={{width: "10%"}}>{value.percentage}%</td> :
                          <td className='mcp-list-table-item fourth-level' style={{width: "10%"}}>{value.percentage}%</td>}
                    <td className='mcp-list-table-item' style={{width: "20%"}}>{value.lastCollected}</td>
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

export default MCPsList