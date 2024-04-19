import {
  createContext,
  useContext,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext(); // Creating ChatContext

export const ChatContextProvider = ({ children }) => { // Creating ChatContextProvider
  const { currentUser } = useContext(AuthContext); // Getting currentUser from AuthContext
  const INITIAL_STATE = { // Initial state for chat context
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => { // Reducer function for chat context
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE); // Using useReducer hook to manage state

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}> {/* Providing state and dispatch to children */}
      {children}
    </ChatContext.Provider>
  );
};

