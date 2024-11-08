import React, { useContext, useEffect, useState } from "react";
import "./profileRightbar.css";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from "../../context/UserContext";
import { followCall, getFollowingsCall, unFollowCall } from "../../apiCalls";
import { Link } from "react-router-dom";

export default function ProfileRightbar({ user }) {
  const [followings, setFollowings] = useState([]);
  const { user: currentUser } = useContext(UserContext);
  const [currentlyFollowing, setCurrentlyFollowing] = useState(
    currentUser.following.includes(user._id)
  );

  const handleClick = async () => {
    try {
      if (currentlyFollowing) {
        await followCall(user, currentUser);
      } else {
        await unFollowCall(user, currentUser);
      }
      setCurrentlyFollowing(!currentlyFollowing);
    } catch (err) {
    }
  };

  // Manages changes to the follow boolean
  useEffect(() => {
    if (currentUser.following.includes(user._id)) {
      setCurrentlyFollowing(true);
    } else {
      setCurrentlyFollowing(false);
    }
  }, [currentUser, user]);

  // Managse changes to the user's followings list
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
      {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {currentlyFollowing ? "Unfollow" : "Follow"}
            {currentlyFollowing ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
      <div className="profileRightbarInfo">
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
        <h4 className="profileRightbarTitle">Your friends</h4>
        <div className="profileRightbarFollowings">
        { followings.map((friend) => (
            <Link to={"/profile/" + friend.username} key={ friend._id }>
              <div className="profileRightbarFollowing">
                <img src={ process.env.REACT_APP_PUBLIC_FOLDER + (friend.profilePicture || "person/noAvatar.png") }
                  alt="" className="profileRightbarFollowingImg" />
                <span className="profileRightbarFollowingName">{ friend.username }</span>
              </div>
            </Link>
          )) }
        </div>
      </div>
    </div>
  )
}