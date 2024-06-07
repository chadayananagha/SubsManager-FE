export const fetchCategories = async () => {
	try {
		const response = await fetch(
			'https://subsmanager-be.onrender.com/subscriptions'
		);
		const data = await response.json();
		const publicCategories = data
			.filter((subscription) => subscription.public) // Filter only public subscriptions
			.map((subscription) => subscription.category);
		const uniqueCategories = [...new Set(publicCategories)];
		return uniqueCategories;
	} catch (error) {
		console.error('Error fetching categories:', error);
		return [];
	}
};

export const fetchCategoryPlatforms = async (category) => {
	try {
		const url = `https://subsmanager-be.onrender.com/subscriptions?category=${category}`;
		const response = await fetch(url);
		const data = await response.json();
		const platforms = data
			.filter((subscription) => subscription.public) // Filter public subscriptions
			.map((subscription) => subscription.platformName);
		return platforms;
	} catch (error) {
		console.error('Error fetching category platforms:', error);
		return [];
	}
};

export const fetchUsers = async (platformName) => {
	try {
		const url = `https://subsmanager-be.onrender.com/users/all?platformName=${platformName}`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching users:', error);
		return [];
	}
};

export const fetchUserById = async (userId) => {
	try {
		const url = `https://subsmanager-be.onrender.com/users/${userId}`;
		const response = await fetch(url);
		const userData = await response.json();
		return userData;
	} catch (error) {
		console.error('Error fetching user by ID:', error);
		return null;
	}
};
