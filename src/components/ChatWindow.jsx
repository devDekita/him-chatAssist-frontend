import React, { useState, useEffect, useRef } from "react";
import { sendMessageToBot } from "../services/chatbotServices";
import "./ChatWindow.css";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const welcomeMessage = {
      sender: "bot",
      html: `<p>Hello! This is HIM Chatbot. How can I assist you?</p>`,
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSend = async (inputText = userInput) => {
    if (!inputText.trim()) return;

    const newUserMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput("");
    setIsTyping(true);

    try {
      const data = await sendMessageToBot(inputText);
      const botReply = {
        sender: "bot",
        html: data.reply || "<p>Sorry, I didn't understand that.</p>",
      };

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, botReply]);
      }, 1000); // Simulated typing delay
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", html: "<p>Oops! Something went wrong.</p>" },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const sendQuickMessage = (msg) => {
    setUserInput("");
    handleSend(msg);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        Welcome to HIM ChatAssist
        <span className="chat-close" title="Close chat" onClick={onClose}>⬇</span>
      </div>
      <div className="chat-body">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.sender === "user" ? (
              <p>{msg.text}</p>
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: msg.html }}
                onClick={(e) => {
                  if (e.target.tagName === "BUTTON") {
                    const msg = e.target.getAttribute("data-message");
                    if (msg) sendQuickMessage(msg);
                  }
                }}
              />
            )}
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          id="chatInput"
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
