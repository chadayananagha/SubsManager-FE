import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ChatWindow = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [chatContent, setChatContent] = useState([]);
  const { userId, token } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    const newMessage = {
      content: message.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setChatContent((prevChatContent) => [...prevChatContent, newMessage]);

    setMessage("");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <button
          className="absolute top-0 right-0 mr-4 mt-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
        <div className="chat-content h-64 overflow-y-auto">
          {chatContent.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sentByUser ? "sent" : "received"}`}
            >
              <div className="message-content">
                <p>{msg.content}</p>
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            className="flex-grow border rounded-l-lg p-2"
            placeholder="Type your message..."
            value={message}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-r-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;