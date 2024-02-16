import React, { useEffect, useState } from "react";
import { useChatSocketCtx } from "../../context/ChatContext";

// import { Container } from './styles';

type Message = {
  authorId: number;
  name: string;
  message: string;
};

const Chat: React.FC = () => {
  const { socket, username } = useChatSocketCtx();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessages((oldMessages) => [...oldMessages, data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket, messages]);

  const handleSubmit = () => {
    if (!message) return;
    socket.emit("message", {
      username,
      message,
    });
    setMessage("");
  };
  return (
    <div>
      <h1>Welcome Chat</h1>
      <ul>
        {messages.length > 0 &&
          messages.map((data, idx) => (
            <li key={idx}>
              {data.name} escreveu {data.message}
            </li>
          ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default Chat;
