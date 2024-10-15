import React from "react";
import "./profileRightbar.css";

export default function ProfileRightbar() {
  return (
    <div className="profileRightbar">
      <div className="profileRightbarInfo">
        <h4 className="profileRightbarTitle">User Information</h4>
        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">City: </span>
          <span className="profileRightbarInfoValue">New York</span>
        </div>
        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">From: </span>
          <span className="profileRightbarInfoValue">Madrid</span>
        </div>
        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Relationship: </span>
          <span className="profileRightbarInfoValue">Single</span>
        </div>
      </div>
      <div className="profileRightbarFriends">
        <h4 className="profileRightbarTitle">Your friends</h4>
        <div className="profileRightbarFollowings">
          <div className="profileRightbarFollowing">
            <img src="assets/person/2.jpeg" alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingName">Joshua Door</span>
          </div>
          <div className="profileRightbarFollowing">
            <img src="assets/person/3.jpeg" alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingName">Joshua Door</span>
          </div>
          <div className="profileRightbarFollowing">
            <img src="assets/person/4.jpeg" alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingName">Joshua Door</span>
          </div>
          <div className="profileRightbarFollowing">
            <img src="assets/person/5.jpeg" alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingName">Joshua Door</span>
          </div>
          <div className="profileRightbarFollowing">
            <img src="assets/person/6.jpeg" alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingName">Joshua Door</span>
          </div>
          <div className="profileRightbarFollowing">
            <img src="assets/person/7.jpeg" alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingName">Joshua Door</span>
          </div>
        </div>
      </div>
    </div>
  )
}