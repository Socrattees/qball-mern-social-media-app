import "./messenger.css";
import Navbar from "../../components/navbar/Navbar";
import Conversation from "../../components/conversation/Conversation.jsx";
import Message from "../../components/message/Message.jsx";
import ChatOnline from "../../components/chatOnline/ChatOnline.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext.js";
import { getConversationCall, getMessagesCall, newMessageCall } from "../../apiCalls.js";


export default function Messenger() {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null); //conversation that's selected
  const [messages, setMessages] = useState([]); //messages from the selected conversation
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage
    };
    newMessageCall(message);
    const res = await getMessagesCall(currentChat._id);
    setMessages(res.data);
    setNewMessage("");
  }

  // useEffect for grabbing all the conversations from the API
  useEffect(() => {
    const getConversation = async () => {
      const res = await getConversationCall(user._id);
      setConversations(res.data);
    }
    getConversation();
  }, [user]);

  // useEffect for grabbing the messages from currentChat, which is the currently selected conversation
  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        const res = await getMessagesCall(currentChat._id);
        setMessages(res.data);
      }
    }
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <Navbar/>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder="Search for friends" className="chatMenuInput" />
            { conversations.map((conversation) => {
              return (
                <div key={ conversation._id } onClick={ () => setCurrentChat(conversation) }>
                  <Conversation conversation={ conversation }/>
                </div>
              )
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              { messages.map((message, index) => {
                return (
                  // ref is set to scrollRef it it's the last message, causing scroll to go to it
                  <div ref={ index === messages.length - 1 ? scrollRef : null } >
                    <Message isOwn={ message.sender === user._id } key={ message._id } message={ message }/>
                  </div>
                )
              })}
            </div>
            <form className="chatBoxBottom">
              <textarea className="chatMessageInput" placeholder="Type a message" onChange={ (e) => setNewMessage(e.target.value)} value={ newMessage }></textarea>
              <button className="chatSubmitButton" onClick={ handleSubmit }>Send</button>
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