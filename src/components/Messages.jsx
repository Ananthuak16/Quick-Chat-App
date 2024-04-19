import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]); // State to store messages
  const { data } = useContext(ChatContext); // Getting chat data from ChatContext

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => { // Listen for changes in the chat document
      doc.exists() && setMessages(doc.data().messages); // Update messages state when document changes
    });

    return () => {
      unSub(); // Unsubscribe from onSnapshot when component unmounts
    };
  }, [data.chatId]); // Re-run effect when chatId changes

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} /> // Render each message component
      ))}
    </div>
  );
};

export default Messages;
