import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ChatSocketCtxProvider from "./context/ChatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChatSocketCtxProvider>
      <App />
    </ChatSocketCtxProvider>
  </React.StrictMode>
);
