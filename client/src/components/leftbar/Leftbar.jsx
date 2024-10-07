import React from "react";
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

export default function Leftbar() {
  return (
    <div className="leftbar">
        <div className="leftbarWrapper">
          <ul className="leftbarList">
            <li className="leftbarListItem">
              <RssFeedIcon className="leftbarIcon"/>
              <span className="leftbarListItemText">Feed</span>
            </li>
            <li className="leftbarListItem">
              <ChatIcon className="leftbarIcon"/>
              <span className="leftbarListItemText">Chats</span>
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
        </div>
      Leftbar
    </div>
  );
}