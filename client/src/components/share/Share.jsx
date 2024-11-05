import React, { useContext, useRef, useState } from "react";
import "./share.css";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { UserContext } from "../../context/UserContext.js";
import { newPostCall } from "../../apiCalls.js";

export default function Share() {
  const { user } = useContext(UserContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value || ""
    }
    newPostCall(newPost);
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={ process.env.REACT_APP_PUBLIC_FOLDER + (user.profilePicture || "person/noAvatar.png")} alt="" />
          <input type="text" className="shareInput" placeholder="What's on your mind?" ref={ desc }/>
        </div>
        <hr className="shareHr"/>
        <form className="shareBottom" onSubmit={ submitHandler }>
          <div className="shareOptions">
            {/* The option below is designed to allow file upload by clicking on element rather than using default button */}
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="purple" className="shareIcon" />
              <span className="shareOptionText">Photo/Video</span>
              <input style={{ display: "none" }} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={ (e) => setFile(e.target.files[0])}/>
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <LocationOnIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}