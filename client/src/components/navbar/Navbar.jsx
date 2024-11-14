import React, { useContext } from "react";
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext.js";
import { LogOut } from "../../context/UserActions.js";
import { logOutCall } from "../../apiCalls.js";

export default function Navbar() {
  const { user, dispatch } = useContext(UserContext);

  // logs the user out of their account
  const handleLogOut = () => {
    logOutCall(user, dispatch); // changes the user to offline in server
    localStorage.removeItem("user"); // removes user details from local storage
    dispatch(LogOut()); // removes user details from context state
    window.location.reload();
  }

  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Link to="/">
          <span className="logo">
            Q-Ball
          </span>
        </Link>
      </div>
      <div className="navbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon"/>
          <input type="text" placeholder="Search for friend, post or video" className="searchInput" />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
          <Link to={ "/" }>
            <span className="navbarLink">Homepage</span>
          </Link>
          <span className="navbarLink" onClick={ handleLogOut }>Log Out</span>
        </div>
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <PersonIcon />
            <span className="navbarIconBadge">1</span>
          </div>
          <div className="navbarIconItem">
            <ChatIcon />
            <span className="navbarIconBadge">1</span>
          </div>
          <div className="navbarIconItem">
            <NotificationsIcon />
            <span className="navbarIconBadge">1</span>
          </div>
        </div>
        <Link to={ `/profile/${user._id}` }>
          <img src={ process.env.REACT_APP_PUBLIC_FOLDER + (user.profilePicture || "person/noAvatar.png") } alt="" className="navbarImg" />
        </Link>
      </div>
    </div>
  )
}