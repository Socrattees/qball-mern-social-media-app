import "./message.css";

export default function Message({isOwn}) {
  return (
    <div className={ isOwn? "message own" : "message" }>
      <div className="messageTop">
        { !isOwn &&
          <img src={ process.env.REACT_APP_PUBLIC_FOLDER + "post/5.jpeg" } alt="" className="messageImg" />
        }
        <p className="messageText">I love the feel of wood curls flying off the lathe as I begin to shape the log in front of me. The sound of scraping changes based on the wetness of the wood, the speed at which the lathe is turning, and the type of cut I am making. The smell and feel of wet wood being turned are unique. The water is sprayed out as I cut through the different layers of wood. A log can turn into anything one's imagination can think of with the right set of hands-on tools. I have those hands and imagination. I use all of my senses and intuition to create a beautiful object. That is why I enjoy turning wood.

        </p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  )
}