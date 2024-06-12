import axios from "axios";
export const fetchUserData = async (userId, token) => {
  try {
    const response = await axios.get(
      `https://subsmanager-be.onrender.com/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // console.log(error);
    throw error;
  }
};
