import React, { useContext, useEffect, useState } from "react";
import "./profileRightbar.css";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from "../../context/UserContext.js";
import { followCall, getFollowingsCall, unFollowCall } from "../../apiCalls";
import { Link } from "react-router-dom";

export default function ProfileRightbar({ user }) {
  const [followings, setFollowings] = useState([]); // Profile's list of followings
  const { user: currentUser } = useContext(UserContext);
  const [currentlyFollowing, setCurrentlyFollowing] = useState(
    currentUser.following.includes(user._id)
  ); // Boolean to determine if the current user is following this profile or not

  // Handles click caused by the follow button
  const handleClick = async () => {
    try {
      if (currentlyFollowing) {
        await unFollowCall(user, currentUser);
      } else {
        await followCall(user, currentUser);
      }
      setCurrentlyFollowing(!currentlyFollowing);
    } catch (err) {
    }
  };

  // useEffect to determine if the current user is following the profile
  useEffect(() => {
    if (currentUser.following.includes(user._id)) {
      setCurrentlyFollowing(true);
    } else {
      setCurrentlyFollowing(false);
    }
  }, [currentUser, user]);

  // useEffect to get the list of followings for the profile
  useEffect(() => {
    const getFriends = async () => {
      if (user && user._id) {
        try {
          const followingsList = await getFollowingsCall(user);
          if (followingsList) {
            setFollowings(followingsList.data);
          } else {
            setFollowings([]);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    getFriends();
  }, [user]);

  return (
    <div className="profileRightbar">
      <div className="profileRightbarInfo">
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {currentlyFollowing ? "Unfollow" : "Follow"}
            {currentlyFollowing ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="profileRightbarTitle">User Information</h4>
        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">City: </span>
          <span className="profileRightbarInfoValue">{ user.city }</span>
        </div>
        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">From: </span>
          <span className="profileRightbarInfoValue">{ user.from }</span>
        </div>
        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Relationship: </span>
          <span className="profileRightbarInfoValue">{ user.relationship }</span>
        </div>
      </div>
      <div className="profileRightbarFriends">
        <h4 className="profileRightbarTitle">Following</h4>
        <div className="profileRightbarFollowings">
        {followings.map((friend) => (
          <Link to={"/profile/" + friend.username} key={ friend._id }>
            <div className="profileRightbarFollowing">
              <img
                src={
                  process.env.REACT_APP_PUBLIC_FOLDER +
                  (friend.profilePicture || "person/noAvatar.png")
                }
                alt=""
                className="profileRightbarFollowingImg"
              />
              <span className="profileRightbarFollowingName">{ friend.username }</span>
            </div>
          </Link>
          ))}
        </div>
      </div>
    </div>
  )
}