import React from "react";
import "./profile.css";
import Navbar from "../../components/navbar/Navbar.jsx";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import ProfileRightbar from "../../components/profileRightbar/ProfileRightbar.jsx";

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">     
              <img className="profileCoverImg" src="assets/post/1.jpeg" alt="" />
              <img className="profileUserImg" src="assets/person/1.jpeg" alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">User</h4>
              <span className="profileInfoDesc">User Desc</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <ProfileRightbar />
          </div>
        </div>
      </div>
    </>
  );
}