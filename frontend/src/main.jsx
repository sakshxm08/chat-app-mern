import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ConversationContextProvider } from "./context/ConversationContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ConversationContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </ConversationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
