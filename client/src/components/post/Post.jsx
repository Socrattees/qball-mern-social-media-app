import React, { useState, useEffect } from "react";
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import TimeAgo from 'timeago-react';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const likeHandler = () => {
    if (!isLiked) {
      setLike(like + 1);
      setIsLiked(true);
    } else {
      setLike(like - 1);
      setIsLiked(false);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`users/${post.userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err.response ? err.response.data : err.message);
      }
    }
    fetchUser();
  }, [post.userId]);
  
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={ user.profilePicture ? `${process.env.REACT_APP_PUBLIC_FOLDER}${user.profilePicture}` :  `${process.env.REACT_APP_PUBLIC_FOLDER}/person/noAvatar.png`} alt="" />
            <span className="postUsername">{ user.username }</span>
            <TimeAgo className="postDate" datetime={ post.createdAt }/>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            { post.desc || ""}
          </span>
          <img className="postImg" src={ post.img ? `${process.env.REACT_APP_PUBLIC_FOLDER}${post.img}` : `${process.env.REACT_APP_PUBLIC_FOLDER}person/noCover.png`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="reactIcon" src={ process.env.REACT_APP_PUBLIC_FOLDER + "like.png" } alt="" onClick={ likeHandler } />
            <img className="reactIcon" src={ process.env.REACT_APP_PUBLIC_FOLDER + "heart.png" } alt="" />
            <span className="postLikeCounter">{ like } people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{ post.comment } comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}