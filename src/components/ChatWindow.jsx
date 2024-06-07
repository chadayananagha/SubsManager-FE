import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';
import axios from 'axios';

const ChatWindow = ({ onClose, receiver }) => {
	const [message, setMessage] = useState('');
	const [chatContent, setChatContent] = useState([]);
	const { userId, token } = useContext(AuthContext);
	const [socket, setSocket] = useState(null);
	const [conversations, setConversations] = useState(null);
	let conversionCreated = false;
	const scrollRef = useRef();
	useEffect(() => {
		const newSocket = io('http://localhost:8080', {
			query: { token },
		});
		setSocket(newSocket);

		// Handle receiving messages
		newSocket.on('receiveMessage', (msg) => {
			if (msg?.senderId === receiver._id || msg?.receiverId === userId) {
				setChatContent((prevChatContent) => [...prevChatContent, msg]);
				console.log('this is chat content:', chatContent);
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

	// create new conversation if not exists
	const createNewConversation = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8080/conversation/${userId}/${receiver._id}`
			);

			console.log('My Response:', response.data);
			if (response.data && response.data.length > 0) {
				setConversations(response.data[0]);
				return response.data[0]._id;
			}
			if (!conversionCreated) {
				conversionCreated = true;
				const postResponse = await axios.post(
					'http://localhost:8080/conversation',
					{
						members: [userId, receiver._id],
					}
				);
				setConversations(postResponse.data);
				return postResponse.data._id;
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		const getConversationBetweenTwo = async () => {
			if (userId && receiver._id) {
				const converstationId = await createNewConversation();
				getAllMessages(converstationId);
			}
		};

		getConversationBetweenTwo();
	}, [userId, receiver._id]);

	// New Code ///////// get chat history

	const getAllMessages = async (conversationsId) => {
		try {
			const response = await axios.get(
				`http://localhost:8080/chat/${conversationsId}`
			);
			console.log('response.data in getallMessages:', response.data);
			setChatContent(response.data);
		} catch (error) {
			console.error('Error fetching messages:', error.message);
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [chatContent]);

	const handleSendMessage = () => {
		if (message.trim() === '') return;
		if (receiver._id === userId) return;

		const newMessage = {
			sender: userId,
			receiver: receiver._id,
			message: message.trim(),
			conversation: conversations._id,
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
					{chatContent &&
						chatContent.length > 0 &&
						chatContent.map((msg, index) => (
							<div key={index} ref={scrollRef}>
								{msg.sender === userId ? (
									<div className='chat chat-end'>
										<div className='chat-bubble'>{msg.message}</div>
									</div>
								) : (
									<div className='chat chat-start'>
										<div className='chat-bubble'>{msg.message}</div>
									</div>
								)}
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
