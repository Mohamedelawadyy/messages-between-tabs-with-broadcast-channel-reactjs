import "../App.css";
import React, { useState, useEffect } from "react";

const Message = ({ tab, msg }) => (
  <div className="message">
    <p>
      {tab} : {msg}
    </p>
  </div>
);

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [isMessageFound, setIsMessageFound] = useState(false);
  const bc = new BroadcastChannel("test");

  useEffect(() => {
    bc.onmessage = (msg) => {
      console.log(msg);
      setMessages([...messages, { tab: "Another tab", msg: msg.data }]);
    };
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.messageInput;
    const message = messageInput.value.trim();
    if (message === "") {
      alert("message field is required");
      return;
    }
    setMessages([...messages, { tab: "Current tab", msg: message }]);
    bc.postMessage(message);
    messageInput.value = "";
  };

  const clearMessages = () => {
    setMessages([]);
    setIsMessageFound(false);
  };

  return (
    <div className="chat-container">
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="messageInput"
          className="message-input"
          placeholder="Enter your message"
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
      <button onClick={clearMessages}>Clear Messages</button>
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} tab={msg.tab} msg={msg.msg} />
        ))}
      </div>
    </div>
  );
};

export default ChatContainer;
