import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AddSubsForm = ({ closeForm, handleSubmit }) => {
	const [formData, setFormData] = useState({
		category: '',
		platformName: '',
		plan: {
			planName: '',
			price: '',
			maxMembers: '',
		},
		expirationDate: '',
		public: false,
	});

	const handlePublic = (e) => {
		setFormData((prevData) => ({
			...prevData,
			public: e.target.checked,
		}));
	};

	const handleChange = (e) => {
		const { name, value, type } = e.target;

		if (type === 'checkbox') {
			setFormData((prevData) => ({
				...prevData,
				[name]: e.target.checked,
			}));
		} else {
			setFormData((prevData) => ({ ...prevData, [name]: value }));
		}
	};

	const handlePlanChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			plan: { ...prevData.plan, [name]: value },
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		handleSubmit(formData);
	};

	// Get today's date in yyyy-mm-dd format
	const today = new Date().toISOString().split('T')[0];

	return (
		// <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<motion.div
			initial={{ height: 0, opacity: 0 }}
			animate={{ height: 'auto', opacity: 1 }}
			exit={{ height: 0, opacity: 0 }}
			transition={{ height: { duration: 0.5 }, opacity: { duration: 0.2 } }}
			className=' shadow-[0_0_0_10000px_rgba(0,0,0,.40)] absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-lg p-6   w-full max-w-md sm:max-w-lg lg:max-w-xl overflow-hidden'
		>
			{/* <IoMdCloseCircle className='hover:cursor-pointer' /> */}
			<button
				type='button'
				onClick={closeForm}
				className='float-right hover:cursor-pointer hover:scale-105 rounded'
			>
				<FaTimes size={22} />
			</button>

			<h2 className='text-2xl mb-4'>Add Your Subscription</h2>
			<form onSubmit={onSubmit}>
				<div className='mb-4 '>
					<label>Category</label>
					<select
						name='category'
						value={formData.category}
						onChange={handleChange}
						className='w-full px-3 py-2 input-color rounded'
						required
					>
						<option value=''>Select a category</option>
						<option value='Entertainment'>Entertainment</option>
						<option value='Reading'>Reading</option>
						<option value='Music'>Music</option>
						<option value='e-Learning'>e-Learning</option>
						<option value='Sports'>Sports</option>
						<option value='Gaming'>Gaming</option>
						<option value='others'>others</option>
					</select>
				</div>
				<div className='mb-4'>
					<label className='block'>Platform Name</label>
					<input
						type='text'
						name='platformName'
						placeholder='Enter platform name...'
						value={formData.platformName}
						onChange={handleChange}
						className='w-full px-3 py-2 input-color rounded'
						required
					/>
				</div>
				<div className='mb-4'>
					<label className='block'>Plan Name</label>
					<input
						type='text'
						name='planName'
						placeholder='Enter plan name...'
						value={formData.plan.planName}
						onChange={handlePlanChange}
						className='w-full px-3 py-2 input-color rounded'
						required
					/>
				</div>
				<div className='mb-4'>
					<label className='block'>Price</label>
					<input
						type='number'
						name='price'
						placeholder='Enter your price...'
						value={formData.plan.price}
						onChange={handlePlanChange}
						className='w-full px-3 py-2 input-color rounded'
						required
					/>
				</div>
				<div className='mb-4'>
					<label>Max Members</label>
					<input
						type='number'
						name='maxMembers'
						placeholder='Enter max members...'
						value={formData.plan.maxMembers}
						onChange={handlePlanChange}
						required
						className='w-full px-3 py-2 input-color rounded'
					/>
				</div>
				<div className='mb-4'>
					<label>Expiration Date</label>
					<input
						type='date'
						name='expirationDate'
						value={formData.expirationDate}
						required
						placeholder='yyyy-mm-dd'
						onChange={handleChange}
						className='w-full px-3 py-2 input-color rounded'
					/>
				</div>
				<div className='mb-4 flex  items-center'>
					<label>Display Publicly</label>
					<input
						name='public'
						type='checkbox'
						checked={formData.public}
						onChange={handlePublic}
						className='checkbox ml-4'
					/>
				</div>
				<button
					className='btn bg-primary text-white px-4 py-2 rounded-md shadow-sm font-semibold hover:bg-sky-700'
					type='submit'
				>
					Submit
				</button>
			</form>
		</motion.div>
		// </div>
	);
};

export default AddSubsForm;
