import { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

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

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='bg-base-100 p-6 rounded shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl'>
				<button
					className='btn float-right text-xl p-2 hover:cursor-pointer'
					onClick={closeForm}
				>
					<IoMdCloseCircle className='hover:cursor-pointer' />
				</button>
				<h2 className='text-2xl mb-4'>Add Your Subscription</h2>
				<form onSubmit={onSubmit}>
					<div className='mb-4'>
						<label>Category</label>
						<select
							name='category'
							value={formData.category}
							onChange={handleChange}
							className='w-full px-3 py-2 border rounded'
							required
						>
							<option value=''>Select a category</option>
							<option value='Entertainment'>Entertainment</option>
							<option value='Reading'>Reading</option>
							<option value='Music'>Music</option>
							<option value='e-Learning'>e-Learning</option>
							<option value='Sports'>Sports</option>
							<option value='Gaming'>Gaming</option>
							<option value='other'>other</option>
						</select>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Platform Name</label>
						<input
							type='text'
							name='platformName'
							value={formData.platformName}
							onChange={handleChange}
							className='w-full px-3 py-2 border rounded'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Plan Name</label>
						<input
							type='text'
							name='planName'
							value={formData.plan.planName}
							onChange={handlePlanChange}
							className='w-full px-3 py-2 border rounded'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Price</label>
						<input
							type='number'
							name='price'
							value={formData.plan.price}
							onChange={handlePlanChange}
							className='w-full px-3 py-2 border rounded'
							required
						/>
					</div>
					<div className='mb-4'>
						<label>Max Members</label>
						<input
							type='number'
							name='maxMembers'
							value={formData.plan.maxMembers}
							onChange={handlePlanChange}
							required
							className='w-full px-3 py-2 border rounded'
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
							className='w-full px-3 py-2 border rounded'
						/>
					</div>
					<div className='mb-4'>
						<label>Display Publicaly</label>
						<input
							name='public'
							type='checkbox'
							checked={formData.public}
							onChange={handlePublic}
							className='py-2 ml-4 border rounded'
						/>
					</div>
					<button
						className='btn bg-primary text-white px-4 py-2 rounded-md shadow-sm font-semibold hover:bg-sky-700'
						onClick={handleSubmit}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddSubsForm;
