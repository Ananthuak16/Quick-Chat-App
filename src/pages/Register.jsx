import React, { useState } from 'react';
import Add from "../images/addAvatar.webp";
import {  createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth,storage,db } from '../firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { IoLogoSnapchat } from "react-icons/io5";
import "../style.scss";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false); // State for error handling
  const [loading, setLoading] = useState(false); // State for loading state
  const navigate = useNavigate(); // Navigation hook

  const handleSubmit = async (e) => { // Function to handle form submission
    setLoading(true); // Set loading state to true
    e.preventDefault(); // Prevent default form submission
    const displayName = e.target[0].value; // Get display name from form
    const email = e.target[1].value; // Get email from form
    const password = e.target[2].value; // Get password from form
    const file = e.target[3].files[0]; // Get file from form input

    try {
      // Create user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      // Upload image to storage
      await uploadBytesResumable(storageRef, file).then(() => {
        // Get download URL of the uploaded image
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update user profile with display name and photo URL
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // Create user document in firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Create empty user chats document in firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/"); // Navigate to home page
          } catch (err) {
            console.log(err);
            setErr(true); // Set error state to true
            setLoading(false); // Set loading state to false
          }
        });
      });
    } catch (err) {
      setErr(true); // Set error state to true
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className='formCotainer'>
        <div className='formWrapper'>
            <span className='logo'> Quick <IoLogoSnapchat /></span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input style={{display:"none"}} type="file" id='file' />
                <label  htmlFor='file'>
                    <img src={Add} alt="image "/>
                    <span>Add an Avatar</span>
                    </label>
                    <button disabled={loading}>Sign up</button>
                    {loading && "Uploading and compressing the image please wait..."}
                {err && <span>something went wrong</span>}
            </form>
            <p> You do have an account? <Link to="/login">Login</Link></p>

        </div>

      
    </div>
  );
};

export default Register;
