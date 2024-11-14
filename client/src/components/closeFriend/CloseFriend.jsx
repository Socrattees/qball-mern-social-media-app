import React from "react";
import "./closeFriend.css";

export default function CloseFriend({ user }) {
  return (
    <li className="leftbarFriend">
      <img src={ process.env.REACT_APP_PUBLIC_FOLDER + (user.profilePicture || "person/noAvatar.png") } alt="" className="leftbarFriendImg" />
      <span className="leftbarFriendName">{ user.username }</span>
    </li>
  );
}