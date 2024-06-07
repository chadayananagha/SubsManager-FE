import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useJwt } from "react-jwt";
import { AuthContext } from "../context/AuthContext";
import { FaEdit } from "react-icons/fa";
import ProfilePicSelector from "../components/ProfilePicSelector";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "../components/Loading";

const UserProfile = () => {
  const { userId, token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const username = decodedToken?.username;

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    profilePic: "",
    profileCompletionScore: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const localAPI = "http://localhost:8080";
  const deployedAPI = "https://subsmanager-be.onrender.com";

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${localAPI}/users/${userId}`);
        console.log("response", response);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleEditChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${localAPI}/users/${userId}`, userData);
      console.log("response after editing", response.data);
      setUserData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-center min-h-screen">
        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-hidden rounded-lg bg-base-200 w-[600px] shadow-lg">
            <div className="px-4 py-5 sm:px-6 flex gap-4">
              <ProfilePicSelector
                userId={userId}
                userData={userData}
                setUserData={setUserData}
              />
              <h3 className="text-3xl font-semibold text-primary">
                {username}
              </h3>
              <button
                onClick={() => setIsEditing(true)}
                className="ml-auto btn btn-primary rounded-md shadow-sm text-black flex items-center"
              >
                <span className="hidden sm:inline">Edit Profile info</span>
                <span>
                  <FaEdit className="inline sm:hidden" />
                </span>
              </button>
            </div>
            <div className="border-t border-primary px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-primary">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-bold">First name</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    {userData.firstName}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-bold">Last name</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    {userData.lastName}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-bold">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    {userData.email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-bold">Country</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    {userData.country}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-base-100 rounded-lg p-6 w-96 shadow-[0_0_0_10000px_rgba(0,0,0,.40)] relative">
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="float-right hover:cursor-pointer hover:bg-primary rounded"
            >
              <AiOutlineCloseCircle size={22} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded p-2 focus:border-primary focus:ring-primary transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded p-2 focus:border-primary focus:ring-primary transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded p-2 focus:border-primary focus:ring-primary transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={userData.country}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded p-2 focus:border-primary focus:ring-primary transition"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleSave}
                className="btn btn-primary text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
