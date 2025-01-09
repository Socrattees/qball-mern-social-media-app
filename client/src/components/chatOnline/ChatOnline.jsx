import { useEffect, useState } from "react";
import { getConversationTwoUsersCall, getFollowingsCall } from "../../apiCalls";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentUser, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  const handleClick = async (friendUserId) => {
    const res = await getConversationTwoUsersCall(currentUser._id, friendUserId);
    setCurrentChat(res.data);
  };

  useEffect(() => {
    const getFriends = async () => {
      const res = await getFollowingsCall(currentUser);
      setFriends(res.data);
    };
    getFriends();
  }, [currentUser]);

  useEffect(() => {
    setOnlineFriends(friends.filter((friend) => onlineUsers.includes(friend._id)));
  }, [friends, onlineUsers]);
  
  return (
    <div className="chatOnline">
      {onlineFriends.map((friend) => (
        <div
          className="chatOnlineFriend"
          key={friend._id}
          onClick={() => handleClick(friend._id)}
        >
          <div className="chatOnlineFriendImgContainer">
            <img
              src={
                process.env.REACT_APP_PUBLIC_FOLDER +
                (friend.profilePicture || "person/noAvatar.png")
              }
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{ friend.username }</span>
        </div>
      ))}
    </div>
  );
}