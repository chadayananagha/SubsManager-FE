export const fetchCategories = async () => {
  try {
    const response = await fetch(
      "https://subsmanager-be.onrender.com/subscriptions"
    );
    const data = await response.json();
    const uniqueCategories = [
      ...new Set(data.map((subscription) => subscription.category)),
    ];
    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchCategoryPlatforms = async (category) => {
  try {
    const url = `https://subsmanager-be.onrender.com/subscriptions?category=${category}`;
    const response = await fetch(url);
    const data = await response.json();
    const platforms = data.map((subscription) => subscription.platformName);
    return platforms;
  } catch (error) {
    console.error("Error fetching category platforms:", error);
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
    console.error("Error fetching users:", error);
    return [];
  }
};
