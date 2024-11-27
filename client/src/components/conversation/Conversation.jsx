import "./conversation.css";

export default function Conversation() {
  return (
    <div className="conversation">
      <img src={ process.env.REACT_APP_PUBLIC_FOLDER + "person/5.jpeg" } alt="" className="conversationImg" />
      <span className="conversationName">Jane</span>
    </div>
  )
}