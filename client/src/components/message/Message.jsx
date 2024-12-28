import { useEffect, useState } from "react";
import "./message.css";
import { formatDistanceToNow, parseISO } from "date-fns";
import { getFriendMessageCall } from "../../apiCalls";

export default function Message({message, isOwn}) {
    const [friend, setFriend] = useState("");

    // function to convert the post.createdAt value from MangoDB to value that can be used by library date-fns
    const messageDateOutput = () => {
      const dateString = message.createdAt.toString();
      const date = parseISO(dateString);
      return formatDistanceToNow(date) + " ago";
    }

    useEffect(() => {
      if (message && !isOwn) {
        const getFriend = async () => {
          const res = await getFriendMessageCall(message.sender);
          setFriend(res.data);
        }
        getFriend();
      }
    }, [message, isOwn]);

  return (
    <div className={ isOwn ? "message own" : "message" }>
      <div className="messageTop">
        { !isOwn &&
          <img src={ process.env.REACT_APP_PUBLIC_FOLDER + (friend.profilePicture || "person/noAvatar.png") } alt="" className="messageImg" />
        }
        <p className="messageText">
          { message.text }
        </p>
      </div>
      <div className="messageBottom">{ messageDateOutput() }</div>
    </div>
  )
}