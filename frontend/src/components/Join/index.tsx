import React, { useState } from "react";
import { useChatSocketCtx } from "../../context/ChatContext";

// import { Container } from './styles';

const Join: React.FC = () => {
  const { enterRoom } = useChatSocketCtx();
  const [username, setUsername] = useState("");
  const handleSubmit = async () => {
    if (!username) return;
    //const socket = await io.connect("http://localhost:3001");
    // socket.emit("join", username);
    enterRoom(username);
  };
  return (
    <div>
      <h1>Join Room</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={() => handleSubmit()}>Enter</button>
    </div>
  );
};

export default Join;
