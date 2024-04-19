import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(); // Creating AuthContext

export const AuthContextProvider = ({ children }) => { // Creating AuthContextProvider
  const [currentUser, setCurrentUser] = useState({}); // State to store current user

  useEffect(() => { // Effect to listen for authentication state changes
    const unsub = onAuthStateChanged(auth, (user) => { // Listen for authentication state changes
      setCurrentUser(user); // Set current user when authentication state changes
      console.log(user); // Log user information
    });

    return () => {
      unsub(); // Unsubscribe from onAuthStateChanged when component unmounts
    };
  }, []); // Empty dependency array means this effect only runs once, similar to componentDidMount

  return (
    <AuthContext.Provider value={{ currentUser }}> {/* Providing currentUser to children */}
      {children}
    </AuthContext.Provider>
  );
};
