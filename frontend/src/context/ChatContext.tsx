import { ReactNode, createContext, useContext, useState } from "react";
import { Socket, io } from "socket.io-client";

interface ChatSocketCtxState {
  socket: Socket;
  enterRoom: (username: string) => void;
  username: string;
}

const ChatSocketCtx = createContext<ChatSocketCtxState>(
  {} as ChatSocketCtxState
);

export const useChatSocketCtx = () => useContext(ChatSocketCtx);

const ChatSocketCtxProvider = (props: { children?: ReactNode }) => {
  //const socketRef = useRef(io({ autoConnect: false }));
  const [username, setUsername] = useState("");

  const socket = io("http://localhost:3001", { autoConnect: false });

  const enterRoom = (username: string) => {
    if (!username) return;
    setUsername(username);
    socket.emit("join", username);
  };

  return (
    <ChatSocketCtx.Provider value={{ socket, enterRoom: enterRoom, username }}>
      {props.children}
    </ChatSocketCtx.Provider>
  );
};

export default ChatSocketCtxProvider;
