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
            <li className="home-font">Đoàn Duy Long - 2013653</li>
            <li>Nguyễn Tấn Đạt - 2012932 (Leader)</li>
            <li>Dương Hoàng Hảo - 2013091</li>
            <li>Phan Anh Hào - 2013055</li>
            <li>Lê Minh Khiêm - 2013484</li>
            <li>Phạm Nhật Linh - 2013641</li>
            <li>Phạm Khánh Minh - 2013783</li>
          </ol>
        </main>
      </div>
      <div className="background-1">
    </div>
    </>
  )
}

export default Home
