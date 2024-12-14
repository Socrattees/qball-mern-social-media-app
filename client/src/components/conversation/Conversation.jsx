import { useContext, useEffect, useState } from "react";
import "./conversation.css";
import { UserContext } from "../../context/UserContext";
import { getFriendConversationCall } from "../../apiCalls";

export default function Conversation({ conversation }) {
  const { user } = useContext(UserContext);
  const [friend, setFriend] = useState("");

  useEffect(() => {
    if (conversation && user) {
      const friendId = conversation.members.find((member) => {
        //sets friend to member of conversation that's not the current user
        return member !== user._id;
      });
      const getFriend = async () => {
        const res = await getFriendConversationCall(friendId);
        setFriend(res.data);
      }
      getFriend();
    }
  }, [user, conversation]);

  console.log(friend);

  return (
    <div className="conversation">
      <img src={ process.env.REACT_APP_PUBLIC_FOLDER + (friend.profilePicture || "person/noAvatar.png") } alt="" className="conversationImg" />
      <span className="conversationName">{ friend.username }</span>
    </div>
  )
}