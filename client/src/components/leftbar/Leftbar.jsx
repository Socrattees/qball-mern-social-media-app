import React, { useContext, useEffect, useState } from "react";
import "./leftbar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import CloseFriend from "../closeFriend/CloseFriend";
import { getFollowingsCall } from "../../apiCalls";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function Leftbar() {
  const { user:currentUser } = useContext(UserContext);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const fetchFollowings = async () => {
      if (currentUser) {
        try {
          const res = await getFollowingsCall(currentUser);
          setFollowings(res.data);
        } catch (err) {
          console.log("Failed to get followings", err);
        }
      }
    }
    fetchFollowings();
  }, [currentUser]);

  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="leftbarListItem">
            <RssFeedIcon className="leftbarIcon"/>
            <Link to={ "/public-feed" }>
              <span className="leftbarListItemText">Public Feed</span>
            </Link>
          </li>
          <li className="leftbarListItem">
            <ChatIcon className="leftbarIcon"/>
            <Link to={ "/messenger" }>
              <span className="leftbarListItemText">Chats</span>
            </Link>
          </li>
          <li className="leftbarListItem">
            <PlayCircleIcon className="leftbarIcon"/>
            <span className="leftbarListItemText">Videos</span>
          </li>
          <li className="leftbarListItem">
            <GroupIcon className="leftbarIcon"/>
            <span className="leftbarListItemText">Groups</span>
          </li>
          <li className="leftbarListItem">
            <BookmarkIcon className="leftbarIcon"/>
            <span className="leftbarListItemText">Bookmarks</span>
          </li>
          <li className="leftbarListItem">
            <QuestionAnswerIcon className="leftbarIcon"/>
            <span className="leftbarListItemText">Questions</span>
          </li>
          <li className="leftbarListItem">
            <WorkIcon className="leftbarIcon"/>
            <span className="leftbarListItemText">Jobs</span>
          </li>
          <li className="leftbarListItem">
            <EventIcon className="leftbarIcon"/>
            <span className="leftbarListItemText">Events</span>
          </li>
          <li className="leftbarListItem">
            <SchoolIcon className="leftbarIcon"/>
            <span className="leftbarListItemText">Courses</span>
          </li>
        </ul>
        <button className="leftbarButton">Show More</button>
        <hr className="leftbarHr" />
        <ul className="leftbarFriendList">
          { followings.map((user) => {
            return <CloseFriend key={ user._id } user={ user } />
          })}
        </ul>
      </div>
    </div>
  );
}