import React from 'react';
import './ChatbotIcon.css'; // Styling file 

const ChatbotIcon = ({ toggleChat }) => {
  return (
    <div className="chatbot-icon" onClick={toggleChat}>
      <div className="chatbot-icon-circle">
        🤖
      </div>
      <div className="chatbot-tooltip">
        Chat with Expert
      </div>
    </div>
  );
};

export default ChatbotIcon;
