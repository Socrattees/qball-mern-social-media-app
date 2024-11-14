import React from "react";
import "./online.css";

export default function Online({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img src={ process.env.REACT_APP_PUBLIC_FOLDER + (user.profilePicture || "person/NoAvatar.png") } alt="" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{ user.username }</span>
    </li>
);
}