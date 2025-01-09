import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { likeCall } from "../../apiCalls";
import { UserContext } from "../../context/UserContext.js";

export default function Post({ post }) {
  const { user:currentUser } = useContext(UserContext);
  const [user, setUser] = useState({}); // User that post belongs to
  const [like, setLike] = useState(post.likes.length); // Post's likes
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id)); // Boolean that checks if post has been liked by the current user

  // Manages the post's like state by the current user, adding like if user didn't like the post yet
  const likeHandler = () => {
    if (!isLiked) {
      setLike(like + 1);
      setIsLiked(true);
    } else {
      setLike(like - 1);
      setIsLiked(false);
    }
    likeCall(post._id, currentUser._id);
  }

  // Manages how the text is displayed for the number of likes on the post
  const postLikeText = () => {
    if (like) {
      if (like > 1) {
        return like + " people liked it";
      }
      return like + " person liked it";
    } else {
      return "";
    }
  }

  // Function to convert the post.createdAt value from MangoDB to value that can be used by library date-fns
  const postDateOutput = () => {
    const dateString = post.createdAt;
    const date = parseISO(dateString);
    return formatDistanceToNow(date, 'yyyy-MM-dd HH:mm:ss') + " ago";
  }

  // Fetches the user of the post and sets it in the local variable
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    }
    fetchUser();
  }, [post.userId]);
  
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={ `/profile/${post.userId}`}>
              <img
                src={
                  process.env.REACT_APP_PUBLIC_FOLDER +
                  (user.profilePicture || "person/NoAvatar.png")
                }
                alt=""
                className="postProfileImg" 
              />
            </Link>
            <span className="postUsername">{ user.username }</span>
            <span className="postDate">{ postDateOutput() }</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            { post.desc || ""}
          </span>
          <img
            src={
              process.env.REACT_APP_PUBLIC_FOLDER +
              (post.img || "person/noCover.png")
            }
            alt=""
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={process.env.REACT_APP_PUBLIC_FOLDER + "like.png"}
              alt=""
              className="reactIcon"
              onClick={likeHandler}
            />
            {/* <img className="reactIcon" src={ process.env.REACT_APP_PUBLIC_FOLDER + "heart.png" } alt="" /> */}
            <span className="postLikeCounter">{ postLikeText() }</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{ post.comment } comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}