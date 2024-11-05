import React, { useContext } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import "./home.css";
import { UserContext } from "../../context/UserContext.js";

export default function Home () {
  const {user} = useContext(UserContext);
  console.log(user);
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