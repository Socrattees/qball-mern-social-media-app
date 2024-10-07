import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import "./home.css";

export default function Home () {
  return (
    <div>
      <>
        <Navbar />
        <div className="homeContainer">
          <Leftbar />
          <Feed />
          <Rightbar />
        </div>
      </>
    </div>
  )
}