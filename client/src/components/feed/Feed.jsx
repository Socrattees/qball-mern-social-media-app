import React, { useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Feed({ userId }) {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        var res = "";
        if (location.pathname.includes("profile")) {
          res = await axios.get(`/posts/profile/${userId}`);
        } else {
          res = await axios.get(`/posts/timeline/66fd1f42d4aaa89358deac8d`);
        }
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err.response ? err.response.data : err.message);
      }
    }
    fetchPosts();
  }, [location.pathname, userId]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        { posts.map(post => {
          return <Post key={ post._id } post={ post }/>
        })}
      </div>
    </div>
  );
}