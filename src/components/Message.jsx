import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext); // Getting currentUser from AuthContext
  const { data } = useContext(ChatContext); // Getting chat data from ChatContext

  const ref = useRef(); // Ref for scrolling to the last message

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the last message when component mounts or message updates
  }, [message]); // Re-run effect when message updates

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`} // Conditionally apply "owner" class if message sender is current user
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p> {/* Render message text */}
        {message.img && <img src={message.img} alt="" />} {/* Render message image if available */}
      </div>
    </div>
  );
};

export default Message;
