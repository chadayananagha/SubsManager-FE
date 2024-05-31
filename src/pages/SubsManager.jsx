import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUserData } from '../utils/userAPI';
import Loading from '../components/Loading';
import AddSubsForm from '../components/AddSubsForm';
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

const SubsManager = () => {
	const { userId, token } = useContext(AuthContext);
	const [user, setUser] = useState(null); /** to set logged in user */
	const [loading, setLoading] = useState(true);
	const [totalPrice, setTotalPrice] = useState(0);
	const [isFormOpen, setIsFormOpen] = useState(false); /** form to add subs*/

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const userData = await fetchUserData(userId, token);

				setUser(userData); /** setting the logged in user*/

				/** reduce method to display the total price of all subs*/

				const total = userData.subscriptions.reduce((acc, subscription) => {
					return acc + subscription.plan.price;
				}, 0);
				setTotalPrice(parseFloat(total).toFixed(2));
			} catch (error) {
				console.error('Error fetching user data', error);
			} finally {
				setLoading(false);
			}
		};

		if (userId && token) {
			fetchData();
		}
	}, [userId, token]);

	/**  To open form*/
	const formOpens = () => {
		setIsFormOpen(true);
	};

	/**  To close form*/
	const formCloses = () => {
		setIsFormOpen(false);
		console.log(isFormOpen);
	};

	/** Function to handle form submission and POST request to server*/
	const handleSubmit = async (formData) => {
		try {
			const response = await fetch(
				'https://subsmanager-be.onrender.com/subscriptions',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);
			if (response.ok) {
				setIsFormOpen(false);
				toast.success('Subscription created successfully!');
			} else {
				toast.error('Failed to create subscription');
				// throw new Error('Failed to create subscription');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const deleteSubscription = async (index) => {
		try {
			console.log(index);
			const response = await fetch(
				`https://subsmanager-be.onrender.com/subscriptions/${user.subscriptions[index]._id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.ok) {
				toast.success('Subscription deleted successfully!');
			} else toast.error('Failed to delete subscription!');
		} catch (error) {
			toast.error(
				'There was a problem with the delete request: ' + error.message
			);
		}
	};

	return (
		<div className='max-w-lg mx-auto p-8 bg-base-200 shadow-lg rounded-lg mt-28 mb-24'>
			<Toaster position='top-center' reverseOrder={false} />
			{loading ? (
				<Loading /> /* Loading spinner*/
			) : (
				<div className='wrapper'>
					{/* displaying the logged in username */}
					<span className='flex justify-between items-center mb-4'>
						<h5 className='text-xl font-semibold'>{user.username}</h5>
						<button
							className='btn bg-primary text-white px-4 py-2 rounded-md shadow-sm'
							onClick={formOpens}
						>
							Add New Subscription
						</button>
					</span>

					{/* To display the subscription the user has */}
					<div className='mb-6'>
						<h6 className='text-lg mb-2 font-semibold'>Subscriptions:</h6>
						<ul className='space-y-2'>
							{user.subscriptions.map((subscription, index) => (
								<li
									key={subscription._id}
									className='bg-base-100/55 p-3 rounded-md shadow-sm'
								>
									{subscription.platformName} - {subscription.plan.price} €
									<MdDelete
										className='float-right'
										onClick={() => deleteSubscription(index)}
									/>
								</li>
							))}
						</ul>
					</div>

					{/* To display total price */}
					<div className='flex justify-end'>
						<p className='text-lg font-medium'>Total: {totalPrice}</p>
					</div>
				</div>
			)}
			{isFormOpen && (
				<AddSubsForm closeForm={formCloses} handleSubmit={handleSubmit} />
			)}
		</div>
	);
};

export default SubsManager;
