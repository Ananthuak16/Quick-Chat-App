import React, { useContext, useState } from 'react';
import Attach from "../images/attach.png";
import Img from "../images/img.png";
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState(""); // State for input text
  const [img, setImg] = useState(null); // State for selected image

  const { currentUser } = useContext(AuthContext); // Getting currentUser from AuthContext
  const { data } = useContext(ChatContext); // Getting chat data from ChatContext

  const handleSend = async () => {
    if (text.trim() === "" && !img) {
      return; // Don't send empty messages
    }
  
    if (img) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageData = reader.result;
        const imageRef = ref(storage, uuid()); // Generate UUID for the image
        try {
          await uploadString(imageRef, imageData, 'data_url'); // Upload image as data URL
          const downloadURL = await getDownloadURL(imageRef); // Get download URL of the uploaded image
          sendMessage(downloadURL); // Send message with image URL
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };
      reader.readAsDataURL(img); // Read image file as data URL
    } else {
      sendMessage(); // Send message without image
    }
  
    setText(""); // Clear input text
    setImg(null); // Clear selected image
  };
  

  const sendMessage = async (imageUrl = null) => {
    const messageData = {
      id: uuid(), // Generate UUID for the message
      text,
      senderId: currentUser.uid,
      date: Timestamp.now(), // Get current timestamp
    };

    if (imageUrl) {
      messageData.img = imageUrl; // Add image URL to message data if provided
    }

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion(messageData), // Add message to messages array in chat document
    });

    await Promise.all([
      updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(), // Update last message and date in userChats for current user
      }),
      updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(), // Update last message and date in userChats for other user
      }),
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(); // Call handleSend when Enter key is pressed
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress} // Add event listener for Enter key press
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])} // Set selected image when file input changes
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button> {/* Send button */}
      </div>
    </div>
  );
};

export default Input;
