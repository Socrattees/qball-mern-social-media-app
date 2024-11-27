import "./messenger.css";
import Navbar from "../../components/navbar/Navbar";
import Conversation from "../../components/conversation/Conversation.jsx";
import Message from "../../components/message/Message.jsx";
import ChatOnline from "../../components/chatOnline/ChatOnline.jsx";

export default function Messenger() {
  return (
    <>
      <Navbar/>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder="Search for friends" className="chatMenuInput" />
            <Conversation />
            <Conversation />
            <Conversation />
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