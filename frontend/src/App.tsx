import "./App.css";
import Join from "./components/Join";
import Chat from "./components/Chat";
import { useChatSocketCtx } from "./context/ChatContext";
import { useEffect } from "react";

function App() {
  const { username, socket } = useChatSocketCtx();

  useEffect(() => {
    socket.connect();
  }, [socket]);

  return <>{username ? <Chat /> : <Join />}</>;
}

export default App;
