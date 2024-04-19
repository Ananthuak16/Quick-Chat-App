import React from 'react';
import Add from "../images/addAvatar.webp";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { IoLogoSnapchat } from "react-icons/io5";
import "../style.scss";

const Login = () => {
  const [err, setErr] = useState(false); // State for error handling
  const navigate = useNavigate(); // Navigation hook

  const handleSubmit = async (e) => { // Function to handle form submission
    e.preventDefault(); // Prevent default form submission
    const email = e.target[0].value; // Get email from form
    const password = e.target[1].value; // Get password from form

    try {
      await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
      navigate("/"); // Navigate to home page
    } catch (err) {
      setErr(true); // Set error state to true
    }
  };

  return (
    <div className='formCotainer'>
        <div className='formWrapper'>
            <span className='logo'> Quick <IoLogoSnapchat /></span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <button>Sign in</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  );
};

export default Login;
