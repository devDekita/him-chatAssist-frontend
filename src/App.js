import React, { useState } from 'react';
import './App.css';
import ChatbotIcon from './components/ChatbotIcon';
import ChatWindow from './components/ChatWindow';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle the visibility of the chat window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      <h1>Welcome to HIM Chatbot</h1>

      {/* Display the chat window if open */}
      {isChatOpen && <ChatWindow onClose={toggleChat} />}

      {/* Chatbot icon that toggles the chat window */}
      {!isChatOpen && <ChatbotIcon toggleChat={toggleChat} />}
    </div>
  );
};

export default App;
