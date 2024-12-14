import "./messenger.css";
import Navbar from "../../components/navbar/Navbar";
import Conversation from "../../components/conversation/Conversation.jsx";
import Message from "../../components/message/Message.jsx";
import ChatOnline from "../../components/chatOnline/ChatOnline.jsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext.js";
import { getConversationCall } from "../../apiCalls.js";

export default function Messenger() {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      const res = await getConversationCall(user._id);
      setConversations(res.data);
    }
    getConversation();
  }, [user]);

  return (
    <>
      <Navbar/>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder="Search for friends" className="chatMenuInput" />
            { conversations.map((conversation) => {
              return <Conversation key={ conversation._id } conversation={ conversation }/>
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message isOwn={ true }/>
              <Message />
            </div>
            <form className="chatBoxBottom">
              <textarea className="chatMessageInput" placeholder="Type a message"></textarea>
              <button className="chatSubmitButton">Send</button>
            </form>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  )
}