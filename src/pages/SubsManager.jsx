import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUserData } from '../utils/userAPI';
import Loading from '../components/Loading';
import AddSubsForm from '../components/AddSubsForm';
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa6';

const SubsManager = () => {
	const { userId, token } = useContext(AuthContext);
	const [user, setUser] = useState(null); /** to set logged in user */
	const [loading, setLoading] = useState(true);
	const [totalPrice, setTotalPrice] = useState(0);
	const [isFormOpen, setIsFormOpen] = useState(false); /** form to add subs*/
	const [deleteFlag, setDeleteFlag] = useState(false);

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
				setDeleteFlag(true);
			} else toast.error('Failed to delete subscription!');
		} catch (error) {
			toast.error(
				'There was a problem with the delete request: ' + error.message
			);
		}
	};

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
		setDeleteFlag(false);
	}, [userId, token, isFormOpen, deleteFlag === true]);

	/**  To open form*/
	const formOpens = () => {
		setIsFormOpen(true);
	};

	/**  To close form*/
	const formCloses = () => {
		setIsFormOpen(false);
		console.log('helllo');
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

	return (
		<div className='max-w-2xl mx-auto p-8 bg-base-200 shadow-lg rounded-lg mt-28 mb-28'>
			<Toaster position='top-center' reverseOrder={false} />
			{loading ? (
				<Loading /> /* Loading spinner*/
			) : (
				<div className='wrapper'>
					{/* displaying the logged in username */}
					<span className='flex items-center justify-between mb-4'>
						<div className='flex items-center space-x-2'>
							<FaRegUser className='bg-primary rounded-xl' size={26} />
							<h5 className='text-xl font-semibold text-primary'>
								{user.username}
							</h5>
						</div>
						<button
							className='btn bg-primary rounded-md shadow-sm'
							onClick={formOpens}
						>
							<span className='block min-375px:hidden'>+</span>
							<span className='hidden min-375px:block'>
								Add New Subscription
							</span>
						</button>
					</span>

					{/* To display the subscription the user has */}
					<div>
						<h6 className='text-lg mb-4 font-semibold text-center my-10'>
							Your current subscriptions
						</h6>
						<div className='flex justify-between font-semibold mb-3 mt-6'>
							<h5 className='flex-1'>Platform Name</h5>
							<h5 className='flex-1 text-center ml-4'>Price</h5>
							<h5 className='flex-1 text-right'>Action</h5>
						</div>
						<ul className='space-y-2 mb-4'>
							{user.subscriptions.map((subscription, index) => (
								<li
									key={subscription._id}
									className='bg-base-100/55 p-3 rounded-md shadow-sm border-2 border-primary'
								>
									<div className='flex items-center'>
										<div className='flex-1'>
											<p>{subscription.platformName}</p>
										</div>
										<div className='flex-1'>
											<p>{subscription.plan.price} €</p>
										</div>
										<div className='float-right hover:cursor-pointer'>
											<MdDelete onClick={() => deleteSubscription(index)} />
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>

					{/* To display total price */}
					<div className='flex justify-end mt-10'>
						<p className='text-lg font-medium'>
							Total: {'  '} {totalPrice}€
						</p>
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
