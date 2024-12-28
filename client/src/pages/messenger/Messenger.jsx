import "./messenger.css";
import Navbar from "../../components/navbar/Navbar";
import Conversation from "../../components/conversation/Conversation.jsx";
import Message from "../../components/message/Message.jsx";
import ChatOnline from "../../components/chatOnline/ChatOnline.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext.js";
import { getConversationCall, getMessagesCall, newMessageCall } from "../../apiCalls.js";
import { io } from "socket.io-client";

export default function Messenger() {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null); //conversation that's selected
  const [messages, setMessages] = useState([]); //messages from the selected conversation
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage
    };
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: currentChat.members.find((member) => member !== user._id),
      text: newMessage
    });
    await newMessageCall(message);
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
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date().toISOString()
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage
    && currentChat?.members.includes(arrivalMessage.sender)
    && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (user) {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        setOnlineUsers(users.map((user) => user.userId));
      });
    }
  }, [user]);

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
            { currentChat ? (
              <>
                <div className="chatBoxTop">
                  { messages.map((message, index) => {
                    return (
                      // ref is set to scrollRef it it's the last message, causing scroll to go to it
                      <div key={ index } ref={ index === messages.length - 1 ? scrollRef : null }>
                        <Message key={ message._id } isOwn={ message.sender === user._id } message={ message }/>
                      </div>
                    )
                  })}
                </div>
                <form className="chatBoxBottom">
                  <textarea className="chatMessageInput" placeholder="Type a message" onChange={ (e) => setNewMessage(e.target.value)} value={ newMessage }></textarea>
                  <button className="chatSubmitButton" onClick={ handleSubmit }>Send</button>
                </form>
              </>
              ) : (
                <div key="noChatSelected"></div>
              )
            }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={ onlineUsers } currentUser={ user }  setCurrentChat={ setCurrentChat }/>
          </div>
        </div>
      </div>
    </>
  );
}