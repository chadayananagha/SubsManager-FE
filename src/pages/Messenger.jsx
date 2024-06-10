import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { format } from 'timeago.js';
import { FaUser } from 'react-icons/fa';

export const Messenger = () => {
	const { userId, token, profilePic } = useContext(AuthContext);
	const [conversations, setConversations] = useState([]);
	const [displayTextArea, setDisplayTextArea] = useState(false);
	const [newMessage, setNewMessage] = useState('');
	const [selectedConvId, setSelectedConvId] = useState('');
	const [selectedReceiverId, setSelectedReceiverId] = useState('');
	const [socket, setSocket] = useState(null);
	const [chatContent, setChatContent] = useState([]);
	const chatContentRef = useRef(null);

	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
	const [showConversations, setShowConversations] = useState(true);
	const [selectedReceiverProfilePic, setSelectedReceiverProfilePic] =
		useState(null);
	const [selectedReceiverUsername, setSelectedReceiverUsername] =
		useState(null);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 768);
			if (window.innerWidth >= 768) {
				setShowConversations(true);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const newSocket = io('http://localhost:8080', {
			query: { token },
		});
		setSocket(newSocket);

		// Handle receiving messages
		newSocket.on('receiveMessage', (msg) => {
			console.log(msg);
			if (msg?.sender === selectedReceiverId || msg?.receiver === userId) {
				setChatContent((prevChatContent) => [...prevChatContent, msg]);
				console.log('this is chat content:', chatContent);
			}
		});
		// Cleanup on unmount
		return () => {
			newSocket.disconnect();
		};
	}, [token, selectedReceiverId, userId]);

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

			setChatContent(response.data);
			setDisplayTextArea(true);
			setSelectedConvId(conversations[index]._id);
			setSelectedReceiverId(conversations[index].members[memberIndex]._id);

			setSelectedReceiverProfilePic(
				conversations[index].members[memberIndex].profilePic?.url
			);
			setSelectedReceiverUsername(
				conversations[index].members[memberIndex].username
			);
			if (isSmallScreen) {
				setShowConversations(false);
			}
		} catch (error) {
			console.error(error.message);
		}
	};
	// post request to send new message
	// const createNewMessage = async (message) => {
	// 	try {
	// 		const response = await fetch('http://localhost:8080/chat', {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify(message),
	// 		});

	// 		setNewMessage('');
	// 	} catch (error) {
	// 		console.error('Error Sending Message:', error);
	// 	}
	// };

	const handleInputChange = (e) => {
		setNewMessage(e.target.value);
	};

	const handleSendMessage = () => {
		if (newMessage.trim() === '') return;

		const sendNewMessage = {
			sender: userId,
			receiver: selectedReceiverId,
			message: newMessage.trim(),
			timestamp: new Date(),
			conversation: selectedConvId,
		};
		setNewMessage('');

		socket.emit('sendMessage', sendNewMessage);
		setChatContent((prevChatContent) => [...prevChatContent, sendNewMessage]);
	};

	useEffect(() => {
		if (chatContentRef.current) {
			chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
		}
	}, [chatContent]);

	return (
		<div className='flex-1'>
			<div className='my-24 md:my-36 flex flex-wrap justify-center gap-6'>
				{showConversations && (
					<div className='w-full md:w-[40%] mx-2 lg:w-[20%]'>
						<ul className='menu bg-color w-full rounded-lg shadow-lg md:h-auto h-[450px] '>
							<p className='text-primary font-extrabold text-xl py-6 pl-6 md:text-lg md:pl-2'>
								All Conversations
							</p>
							<hr className='bg-primary block md:hidden' />
							{conversations.map((conversation, index) =>
								conversation.members.map((member, memberIndex) => {
									if (member._id !== userId) {
										// Find the latest message for this conversation member
										const latestMessage = chatContent
											.filter(
												(msg) =>
													msg.receiver === member._id ||
													msg.sender === member._id
											)
											.sort(
												(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
											)[0];

										// Find the last sent or received message
										const lastMessage = chatContent
											.filter(
												(msg) =>
													(msg.sender === userId &&
														msg.receiver === member._id) ||
													(msg.receiver === userId && msg.sender === member._id)
											)
											.sort(
												(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
											)[0];

										return (
											<>
												<hr className='bg-primary hidden md:block' />
												<li key={conversation._id}>
													<a
														onClick={() => getAllMessages(index, memberIndex)}
														className='flex text-lg mb-2 rounded-lg cursor-pointer bg-transparent focus:bg-primary text-black hover:bg-primary hover:text-white'
													>
														{member.profilePic ? (
															<img
																src={member.profilePic.url}
																alt={member.username}
																className='h-10 w-10 rounded-full mr-2'
															/>
														) : (
															<FaUser size={24} className='mr-2 ml-2' />
														)}
														<div>
															<div>{member.username}</div>
															<div className='text-sm'>
																{latestMessage
																	? format(latestMessage.timestamp)
																	: ''}
																<br />
																{lastMessage ? lastMessage.message : ''}
															</div>
														</div>
													</a>
												</li>
												<hr className='bg-primary block md:hidden' />
											</>
										);
									}
									return null;
								})
							)}
						</ul>
					</div>
				)}
				{(!showConversations || !isSmallScreen) && (
					<div
						className={`w-full ${
							showConversations ? 'md:w-[50%]' : ''
						} p-4 rounded-lg shadow-lg bg-color mx-2 chatcontent`}
					>
						{/* <h2 className="text-primary font-extrabold text-xl pb-4 md:text-lg">
              Chats
            </h2> */}
						<h2 className='text-primary font-extrabold text-xl pb-4 md:text-lg'>
							{selectedConvId ? 'Chats' : 'Select a conversation to chat'}
						</h2>

						<hr className='bg-primary mb-4' />
						<div
							className='flex flex-col space-y-4 overflow-y-auto h-80 md:h-[500px] lg:h-[540px]'
							ref={chatContentRef}
						>
							{chatContent?.map((msg, index) => (
								<div
									key={index}
									className={`chat ${
										msg.sender === userId ? 'chat-end' : 'chat-start'
									}`}
								>
									<div className='chat-header flex'>
										{msg.sender === userId ? (
											profilePic ? (
												<img
													src={profilePic}
													alt='Profile'
													className='h-6 w-6 rounded-full mr-2'
												/>
											) : (
												<FaUser size={16} className='mr-2' />
											)
										) : selectedReceiverProfilePic ? (
											<img
												src={selectedReceiverProfilePic}
												alt='Receiver Profile'
												className='h-6 w-6 rounded-full mr-2'
											/>
										) : (
											<FaUser size={16} className='mr-2' />
										)}
										<div className='text-black'>
											{msg.sender === userId ? (
												'Me'
											) : (
												<p>{selectedReceiverUsername}</p>
											)}
										</div>
									</div>

									<div
										className={`chat-bubble mt-2 text-white ${
											msg.sender === userId ? 'bg-[#FF5733]' : 'bg-primary'
										}`}
									>
										{msg.message}
									</div>
									<div className='chat-footer flex gap-1 flex-col'>
										<div className='opacity-50 text-xs text-black font-bold'>
											{msg.sender === userId ? 'Delivered' : ''}
										</div>
										<time className='text-xs opacity-50 text-black font-bold'>
											{format(msg.timestamp)}
										</time>
									</div>
								</div>
							))}
						</div>
						{displayTextArea && (
							<div className='mt-4 flex items-center'>
								<input
									type='text'
									className='flex-grow border rounded-lg p-2 bg-transparent text-black border-black mr-2'
									placeholder='Type your message...'
									value={newMessage}
									onChange={handleInputChange}
								/>
								<button
									onClick={handleSendMessage}
									className='btn bg-primary font-bold py-2 px-4 border-none'
								>
									Send
								</button>
							</div>
						)}
					</div>
				)}
			</div>
			{!showConversations && isSmallScreen && (
				<button
					onClick={() => setShowConversations(true)}
					className='btn bg-primary font-bold px-4 border-none mt-[-70px] mb-4 mx-auto block'
				>
					Back to Conversations
				</button>
			)}
		</div>
	);
};
