import axios from 'axios';

// Base URL of  backend server
const API_BASE_URL = 'https://him-chatassist.onrender.com'; 

export const sendMessageToBot = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat`, {
      message: message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message to bot:', error);
    return { reply: 'Sorry, something went wrong!' };
  }
};
