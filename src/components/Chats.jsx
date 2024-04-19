import React, { useContext, useEffect ,useState} from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]); // State to store chats
  const { currentUser } = useContext(AuthContext); // Getting currentUser from AuthContext
  const { dispatch } = useContext(ChatContext); // Getting dispatch function from ChatContext

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => { // Listen for changes in userChats document
        setChats(doc.data()); // Update chats state
      });

      return () => {
        unsub(); // Unsubscribe from onSnapshot when component unmounts
      };
    };

    currentUser.uid && getChats(); // Fetch chats when currentUser is available
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user }); // Dispatch action to change active chat user
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => ( // Sort chats by date and map through them
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p> {/* Display last message text */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
