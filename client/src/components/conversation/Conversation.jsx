import { useContext, useEffect, useState } from "react";
import "./conversation.css";
import { UserContext } from "../../context/UserContext";
import { getFriendConversationCall } from "../../apiCalls";

export default function Conversation({ conversation }) {
  const { user } = useContext(UserContext);
  const [friend, setFriend] = useState("");

  // function to get the friend's conversation and is called in useEffect
  const getFriend = async (friendId) => {
    const res = await getFriendConversationCall(friendId);
    setFriend(res.data);
  }

  useEffect(() => {
    if (conversation && user) {
      const friendId = conversation.members.find((member) => {
        //sets friend to member of conversation that's not the current user
        return member !== user._id;
      });
      getFriend(friendId);
    }
  }, [user, conversation]);

  return (
    <div className="conversation">
      <img src={ process.env.REACT_APP_PUBLIC_FOLDER + (friend.profilePicture || "person/noAvatar.png") } alt="" className="conversationImg" />
      <span className="conversationName">{ friend.username }</span>
    </div>
  )
}