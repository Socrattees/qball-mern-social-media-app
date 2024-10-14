import React from "react";
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Users } from "../../dummyData.js";

export default function Post({ post }) {
  const user = Users.find(user => user.id === post.userId);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={ user.profilePicture} alt="" />
            <span className="postUsername">{ user.username }</span>
            <span className="postDate">{ post.date }</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            { post.desc? post.desc : ""}
          </span>
          <img className="postImg" src={ post.photo } alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="reactIcon" src="assets/like.png" alt="" />
            <img className="reactIcon" src="assets/heart.png" alt="" />
            <span className="postLikeCounter">{ post.like } people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{ post.comment } comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}