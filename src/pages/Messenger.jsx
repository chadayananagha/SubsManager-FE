import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export const Messenger = () => {
  const { userId, token } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [displayTextArea, setDisplayTextArea] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConvId, setSelectedConvId] = useState("");
  const [selectedReceiverId, setSelectedReceiverId] = useState("");

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/conversation/${userId}`
        );
        // console.log(response.data);
        setConversations(response.data);
        // console.log(messages);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) {
      fetchConversation();
    }
  }, [userId]);

  const getAllMessages = async (index, memberIndex) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/chat/${conversations[index]._id}`
      );

      setMessages(response.data);
      setDisplayTextArea(true);
      setSelectedConvId(conversations[index]._id);
      setSelectedReceiverId(conversations[index].members[memberIndex]._id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const createNewMessage = async (message) => {
    try {
      const response = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error Sending Message:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const sendNewMessage = {
      senderId: userId,
      receiverId: selectedReceiverId,
      message: newMessage.trim(),
      timestamp: new Date(),
      conversation: selectedConvId,
    };
    createNewMessage(sendNewMessage);
    setNewMessage("");
    console.log(sendNewMessage);
  };

  return (
    <div className="my-28 flex-1">
      <div>
        <ul className="menu bg-base-200 w-56">
          <li className="menu-title font-extrabold text-xl">Conversations</li>
          {conversations.map((conversation, index) =>
            conversation.members.map(
              (member, memberIndex) =>
                member._id !== userId && (
                  <li key={conversation._id}>
                    <a
                      onClick={() => getAllMessages(index, memberIndex)}
                      className="active text-lg"
                    >
                      {member.username}
                    </a>
                  </li>
                )
            )
          )}
        </ul>
      </div>
      <div>
        {messages?.map((message, index) => (
          <div key={message._id}>
            {message.sender === userId ? (
              <div className="chat chat-end">
                <div className="chat-bubble">{message.message}</div>
              </div>
            ) : (
              <div className="chat chat-start">
                <div className="chat-bubble">{message.message}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        {displayTextArea && (
          <div>
            <input
              type="text"
              className="flex-grow border rounded-lg p-2 bg-transparent text-black border-black"
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSendMessage}
              className="btn bg-primary font-bold py-2 px-4 border-none"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
