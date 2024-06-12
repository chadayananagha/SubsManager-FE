const FAQ = () => {
	return (
		<div className='mx-3 pt-32 '>
			<h2 className='text-3xl font-semibold text-center'>
				Frequently asked questions
			</h2>

			<div
				tabIndex={0}
				className='collapse collapse-plus border border-base-300 bg-primary text-white box-border mx-auto my-12 max-w-7xl rounded-lg py-6 '
			>
				<div className='collapse-title md:text-xl font-medium text-lg'>
					What is X Share ?
				</div>
				<div className='collapse-content text-white/80'>
					<p>
						By using X Share, you can share subscriptions like Netflix, Disney+,
						NordVPN, Spotify, and others with family or friends. This
						collaborative approach allows everyone involved to save money on
						their favorite digital services.
					</p>
				</div>
			</div>

			<div
				tabIndex={0}
				className='collapse collapse-plus border border-base-300 box-border mx-auto my-12 max-w-7xl rounded-lg py-6 bg-primary text-white'
			>
				<div className='collapse-title md:text-xl font-medium text-lg'>
					How to Share Subscription?
				</div>
				<div className='collapse-content px-8'>
					<ul className='list-disc leading-7 text-white/80'>
						<li>
							Click on the button labeled `Share a subscription` next to your
							profile picture in the top right corner of the home page.
						</li>
						<li>Select the subscription you want to share from the list.</li>
						<li>Choose the plan that matches your subscription.</li>
						<li>Indicate the number of slots you wish to share.</li>
						<li>Decide if you want to make your subscription public.</li>
						<li>Submit the details of this subscription.</li>
						<li>
							Chat with potential co-subscribers to arrange payment directly.
						</li>
						<li>
							Once the payment is settled, you can start sharing the
							subscription and save money together!
						</li>
					</ul>
				</div>
			</div>

			<div
				tabIndex={0}
				className='collapse collapse-plus border border-base-300 bg-primary text-white box-border mx-auto my-12 max-w-7xl rounded-lg py-6'
			>
				<div className='collapse-title md:text-xl font-medium text-lg'>
					How to Join In a Subscription ?
				</div>
				<div className='collapse-content px-8'>
					<ul className='list-disc leading-7 text-white/80'>
						<li>
							On Home page you can see the list of subscriptions available
						</li>
						<li>Select the one you want to go for</li>
						<li>
							now you can see the Pop up window with details about the plan and
							option to send message directly to subscription owner
						</li>
						<li>
							Once the payment is settled, you can start sharing the
							subscription and save money together!
						</li>
					</ul>
				</div>
			</div>

			<div
				tabIndex={0}
				className='collapse collapse-plus border border-base-300 bg-primary text-white box-border mx-auto my-12 max-w-7xl rounded-lg py-6'
			>
				<div className='collapse-title md:text-xl font-medium text-lg'>
					How can I add others into my Subscription ?
				</div>
				<div className='collapse-content px-8'>
					<ul className='list-disc leading-7 text-white/80'>
						<li>Go to the manage subscriptions page.</li>
						<li>Click the button “Add members”</li>
						<li>
							Select the subscription you have and enter all necessary
							information
						</li>
						<li>
							You will continue to enjoy the subscription with other members
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default FAQ;
