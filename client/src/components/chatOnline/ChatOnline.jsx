import "./chatOnline.css";

export default function ChatOnline() {
  return (
    <div>
      <div className="chatOnline">
        <div className="chatOnlineFriend">
          <div className="chatOnlineFriendImgContainer">
            <img src={ process.env.REACT_APP_PUBLIC_FOLDER + "person/5.jpeg" } alt="" className="chatOnlineImg"/>
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">Jane</span>
        </div>
      </div>
    </div>
  )
}