import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "../src/contexts/AuthContext";
import { ChatContextProvider } from "../src/contexts/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
  <ChatContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChatContextProvider>
</AuthContextProvider>
);