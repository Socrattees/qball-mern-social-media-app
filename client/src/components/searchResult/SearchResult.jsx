import React from "react";
import "./searchResult.css";
import { Link } from "react-router-dom";

export default function SearchResult({ user }) {
  return (
      <Link to={ `/profile/${user._id}` } className="searchResultFriend" >
        <div className="searchResultProfileImgContainer">
          <img src={ process.env.REACT_APP_PUBLIC_FOLDER + (user.profilePicture || "person/NoAvatar.png") } alt="" className="searchResultProfileImg" />
        </div>
        <span className="searchResultUsername">{ user.username }</span>
      </Link>
);
}