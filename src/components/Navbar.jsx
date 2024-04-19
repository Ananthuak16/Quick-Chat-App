import React, { useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';
import { IoLogoSnapchat } from "react-icons/io5";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext); // Getting currentUser from AuthContext

  return (
    <div className='navbar'>
      <span className="logo">Quick <IoLogoSnapchat /> </span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button> {/* Logout button */}
      </div>
    </div>
  );
};

export default Navbar;
