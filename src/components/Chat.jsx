import React, { useContext } from 'react';
import More from "../images/more.png";
import Add from "../images/add.png";
import Cam from "../images/cam.png";
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../contexts/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <div className="userInfo">
          {data.user && (
            <>
              <img src={data.user.photoURL}  />
              <span>{data.user.displayName}</span>
            </>
          )}
        </div>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div> 
      <Messages/>
      <Input/>
    </div>
  );
}

export default Chat;
