import React from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { Posts } from "../../dummyData.js";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        { Posts.map(post => {
          return <Post key={ post.id } post={ post }/>
        })}
      </div>
    </div>
  );
}