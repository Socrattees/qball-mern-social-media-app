import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import Online from "../online/Online";
import { UserContext } from "../../context/UserContext.js";
import { getFollowingsOnlineCall } from "../../apiCalls.js";

export default function Rightbar() {
  const { user } = useContext(UserContext);
  const [usersOnline, setUsersOnline] = useState([]);

  useEffect(() => {
    const getOnline = async () => {
      if (user) {
        try {
          const res = await getFollowingsOnlineCall(user);
          setUsersOnline(res.data);
        } catch (err) {
          console.log("Failed to fetch the online followings", err);
        }
      }
    };
    getOnline();
  }, [user]);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> are celebrating their birthday today.
          </span>
        </div>
        <img src={ process.env.REACT_APP_PUBLIC_FOLDER + "ad_img.jpg" } alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          { usersOnline.map((user) => {
            return <Online key={ user._id } user={ user }/>
          }) }
        </ul>
      </div>
    </div>
  );
}