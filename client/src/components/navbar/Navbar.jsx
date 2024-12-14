import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext.js";
import { LogOut } from "../../context/UserActions.js";
import { logOutCall, searchCall } from "../../apiCalls.js";
import SearchResult from "../searchResult/SearchResult.jsx";

export default function Navbar() {
  const { user, dispatch } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await searchCall(query);
      setResults(res.data);
    } catch (err) {
      console.log("Failed to fetch the search result");
    }
  };

  //console.log(results);

  // logs the user out of their account
  const handleLogOut = () => {
    logOutCall(user, dispatch); // changes the user to offline in server
    localStorage.removeItem("user"); // removes user details from local storage
    dispatch(LogOut()); // removes user details from context state
    window.location.reload();
  }

  // clears results should the input be empty
  useEffect(() => {
    if (!query) {
      setResults([]);
    }
  }, [query]);

  // allows dynamic results to show depending on the changing query in the input
  // useEffect(() => {
  //   const search = async() => {
  //     try {
  //       const res = await searchCall(query);
  //       setResults(res.data);
  //     } catch (err) {
  //       console.log("Failed to fetch the search result");
  //     }
  //   }
  //   search();
  // }, [query]);

  return (
    <>
      <div className="navbarContainer">
        <div className="navbarLeft">
          <Link to="/">
            <span className="logo">
              Q-Ball
            </span>
          </Link>
        </div>
        <div className="navbarCenter">
          <form className="searchbar" onSubmit={ handleSearch }>
            <button className="searchButton">
              <SearchIcon className="searchIcon" type="submit" />
            </button>
            <input type="text" placeholder="Search for friend, post or video" className="searchInput"
              value={ query } onChange={ (e) => setQuery(e.target.value) }
            />
          </form>
        </div>
        <div className="navbarRight">
          <div className="navbarLinks">
            <Link to={ "/" }>
              <span className="navbarLink">Home</span>
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
      <div className="navbarSearchResults">
        { results.map((userResult) => (
          (user._id !== userResult._id) &&
          <SearchResult key={ userResult._id } user={ userResult } />
        ))}
      </div>
    </>
  )
}