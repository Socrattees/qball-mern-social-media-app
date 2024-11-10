import React, { useEffect, useState } from "react";
import "./profile.css";
import Navbar from "../../components/navbar/Navbar.jsx";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import ProfileRightbar from "../../components/profileRightbar/ProfileRightbar.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({}); // user of the profile page
  const userId = useParams().id; // grabs user id from the params

  // manages changes to the user id and fetches the respective data accordingly
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users?userId=${userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);
  return (
    <>
      <Navbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">     
              <img className="profileCoverImg" src={ process.env.REACT_APP_PUBLIC_FOLDER + (user.coverPicture || "person/noCover.png") } alt="" />
              <img className="profileUserImg" src={ process.env.REACT_APP_PUBLIC_FOLDER + (user.profilePicture || "person/noAvatar.png") } alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{ user.username }</h4>
              <span className="profileInfoDesc">{ user.desc }</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={ userId }/>
            <ProfileRightbar user={ user }/>
          </div>
        </div>
      </div>
    </>
  );
}