import React from "react";
import Navbar from "../navbar/Navbar";
import "./home.css"

const members = [
  {
    fullName: 'Đoàn Duy Long',
    id: 2013653 
  },
  {
    fullName: 'Nguyễn Tấn Đạt',
    id: 2012932 
  },
  {
    fullName: 'Dương Hoàng hảo',
    id: 2013091 
  },
  {
    fullName: 'Phan Anh Hào',
    id: 2103055 
  },
  {
    fullName: 'Lê Minh Khiêm',
    id: 2013484 
  },
  {
    fullName: 'Phạm Nhật Linh',
    id: 2013641 
  },
  {
    fullName: 'Phạm Khánh Minh',
    id: 2013783 
  }
];

const Home = () => {
  return (
    <>
      <Navbar />
      <div className = "home-container text-white">
        <h1 className="home-title text-white">Urban waste collection aid - UWC 2.0</h1>
        <h3 className="home-title-2">Member</h3>
        <main className="member-list text-white">
          <ol>
            {members.map(member => (
              <li key={member.id}>{member.fullName} - {member.id}</li>
            ))}
          </ol>
        </main>
      </div>
      <div className="background-1">
      </div>
    </>
  )
}

export default Home;
