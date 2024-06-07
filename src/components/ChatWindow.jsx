import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';
import axios from 'axios';

const ChatWindow = ({ onClose, receiver }) => {
	const [message, setMessage] = useState('');
	const [chatContent, setChatContent] = useState([]);
	const { userId, token } = useContext(AuthContext);
	const [socket, setSocket] = useState(null);
	const [conversations, setConversations] = useState([]);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const newSocket = io('http://localhost:8080', {
			query: { token },
		});
		setSocket(newSocket);

		// Handle receiving messages
		newSocket.on('receiveMessage', (msg) => {
			if (msg.sender === receiver._id || msg.receiver === userId) {
				setChatContent((prevChatContent) => [...prevChatContent, msg]);
			}
		});

		// Cleanup on unmount
		return () => {
			newSocket.disconnect();
		};
	}, [token, receiver._id, userId]);

	const handleInputChange = (e) => {
		setMessage(e.target.value);
	};

	// new  code /// to get conversation history

	useEffect(() => {
		const getConversationBetweenTwo = async () => {
			console.log(receiver.username);
			console.log(userId, receiver._id);
			try {
				const response = await axios.get(
					`http://localhost:8080/conversation/${userId}/${receiver._id}`
				);
				console.log(receiver.username);
				if (response.data) {
					console.log(response.data);
					setConversations(response.data);
					getAllMessages(response.data[0]._id);
					console.log(response.data);
				} else {
					console.log('i am in no chat');
					setMessages([]);
				}
			} catch (error) {
				console.error(error);
			}
		};
		if (userId) {
			getConversationBetweenTwo();
		}
		console.log(receiver.username);
	}, [userId, receiver._id]);

	// New Code ///////// get chat history

	const getAllMessages = async (conversationsId) => {
		try {
			const response = await axios.get(
				`http://localhost:8080/chat/${conversationsId}`
			);

			setMessages(response.data);
			console.log(response.data);
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleSendMessage = () => {
		if (message.trim() === '') return;
		if (receiver._id === userId) return;

		const newMessage = {
			sender: userId,
			receiver: receiver._id,
			message: message.trim(),
			timestamp: new Date(),
		};

		// Emit the message to the server
		socket.emit('sendMessage', newMessage);

		// Optionally, add the message to the local state immediately
		setChatContent((prevChatContent) => [...prevChatContent, newMessage]);
		console.log(newMessage);

		setMessage('');
	};

	return (
		<div className='fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 px-2'>
			<div className='relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
				<button
					className='absolute top-0 right-0 mt-4 mr-4 text-black font-bold text-2xl'
					onClick={onClose}
					aria-label='Close'
				>
					&times;
				</button>
				<div className='font-bold text-xl mb-4'>
					Chat with {receiver.username}
				</div>
				<div className='chat-content h-64 overflow-y-auto'>
					{messages &&
						messages.length > 0 &&
						messages.map((msg, index) => (
							<div
								key={index}
								className={`message ${
									msg.sender === userId ? 'sent' : 'received'
								}`}
							>
								<div className='message-content text-black'>
									<p>{msg.message}</p>
									<span className='timestamp'>
										{new Date(msg.timestamp).toLocaleTimeString()}
									</span>
								</div>
							</div>
						))}
				</div>
				<div className='flex mt-4 gap-2'>
					<input
						type='text'
						className='flex-grow border rounded-lg p-2 bg-transparent text-black border-black'
						placeholder='Type your message...'
						value={message}
						onChange={handleInputChange}
					/>
					<button
						className='btn bg-primary font-bold py-2 px-4 border-none'
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
