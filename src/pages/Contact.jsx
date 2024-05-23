import { useState } from 'react';

const Contact = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormData({
			name: '',
			email: '',
			phone: '',
			message: '',
		});
	};

	return (
		<div className='max-w-lg mx-auto p-8 bg-base-200 shadow-md rounded-lg mt-28 mb-8'>
			<h2 className='text-2xl font-bold mb-6 text-center'>Contact Us</h2>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<input
						type='text'
						name='name'
						value={formData.name}
						onChange={handleChange}
						placeholder='Your Name'
						className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
						required
					/>
				</div>
				<div className='mb-4'>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						placeholder='Your Email'
						className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
						required
					/>
				</div>
				<div className='mb-6'>
					<textarea
						name='message'
						value={formData.message}
						onChange={handleChange}
						placeholder='Your Message'
						rows='5'
						className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
						required
					></textarea>
				</div>
				<button
					type='submit'
					className='w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Contact;
