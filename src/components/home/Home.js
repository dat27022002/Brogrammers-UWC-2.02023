import React from "react";
import Navbar from "../navbar/Navbar";
import "./home.css"

const Home = () => {
  return (
    <>
      <Navbar />
      <div className = "home-container text-white">
        <h1 className="home-title text-white">Urban waste collection aid - UWC 2.0</h1>
        <h3 className="home-title-2">Member</h3>
        <main className="member-list text-white">
          <ol>
            <li className="home-font">Đỗ Huy Hoàng - 2013219</li>
            <li>Lê Nguyên Hùng - 2013360 (Leader)</li>
            <li>Lê Anh Huy - 2013293</li>
            <li>Nguyễn Đức Huy - 2013307</li>
            <li>Nguyễn Lương Gia Huy - 2013314</li>
            <li>Lê Duy Khang - 2013425</li>
            <li>Đặng Nguyên Phúc - 2014155</li>
          </ol>
        </main>
      </div>
      <div className="background-1"
    style = {{backgroundImage: `url(https://img5.thuthuatphanmem.vn/uploads/2021/08/25/background-la-cay-4k_085534792.jpg)`}}>
    </div>
    </>
  )
}

export default Home
