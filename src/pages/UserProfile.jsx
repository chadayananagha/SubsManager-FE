import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useJwt } from "react-jwt";
import { AuthContext } from "../context/AuthContext";
import { FaEdit } from "react-icons/fa";
import ProfilePicSelector from "../components/ProfilePicSelector";
import { FaTimes } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import Loading from "../components/Loading";
import CountryDropdown from "../components/CountryDropdown";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const UserProfile = () => {
  const { userId, token, updateProfilePic } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const username = decodedToken?.username;
  const [isAnimating, setIsAnimating] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    countryCode: "",
    email: "",
    profilePic: "",
    profileCompletionScore: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(userId).then(() => {
      setIsCopied(true);
      setClickCount((prevCount) => prevCount + 1);
      setTimeout(() => {
        setIsCopied(false);
        setClickCount(0);
      }, 10000);
    });
  };

  const getButtonText = () => {
    if (clickCount >= 50) return "GOD LIKE!!!!!";
    if (clickCount >= 40) return "FATALITY";
    if (clickCount >= 30) return "INSANE";
    if (clickCount >= 20) return "OMG";
    if (clickCount >= 10) return "CRAZY COPY";
    return isCopied ? " ID copied ✓" : "Copy ID";
  };

  const getButtonClass = () => {
    if (clickCount >= 50) return "btn bg-red-600 text-white hover:bg-red-600";
    return isCopied
      ? "btn border-green-500 bg-green-100 text-green-800 hover:bg-green-100 hover:border-green-500 hover:text-green-800"
      : "btn bg-base-300";
  };

  // const localAPI = "http://localhost:8080";
  const deployedAPI = "https://subsmanager-be.onrender.com";

  const calculateProfileCompletionScore = (data) => {
    let score = 0;
    if (data.firstName) score += 25;
    if (data.lastName) score += 25;
    if (data.email) score += 25;
    if (data.country) score += 25;
    return score;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${deployedAPI}/users/${userId}`);
        const userData = response.data;
        userData.profileCompletionScore =
          calculateProfileCompletionScore(userData);
        setUserData(userData);
        updateProfilePic(userData.profilePic.url);
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
    const updatedUserData = {
      ...userData,
      [e.target.name]: e.target.value,
    };
    if (e.target.code) {
      updatedUserData.countryCode = e.target.code;
    }
    updatedUserData.profileCompletionScore =
      calculateProfileCompletionScore(updatedUserData);
    setUserData(updatedUserData);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${deployedAPI}/users/${userId}`,
        userData
      );
      const updatedData = response.data;
      updatedData.profileCompletionScore =
        calculateProfileCompletionScore(updatedData);
      // setUserData(updatedData);
      setUserData((prev) => ({ ...prev, ...updatedData }));
      setIsEditing(false);
      toast.success("Profile updated successfully!", {
        duration: 1000,
        className: "bg-base-100 toast-style",
      }); // Add this line for toast notification
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update profile.", {
        duration: 1000,
        className: "bg-base-100 toast-style",
      }); // Add this line for error notification
    }
  };

  // console.log(userData);

  return (
    <div className="flex-1 relative overflow-hidden">
      <img
        className="absolute top-6 lg:right-4 xl:right-4 2xl:right-0 2xl:top-16 4xl:right-24 4xl:top-6 lg:h-1/3 xl:h-1/2 hidden lg:block -z-20 opacity-70"
        style={{ left: "calc(100% - 20rem)", top: "10rem" }}
        src="/images/profilePicBg3.png"
        alt="Sidebar illustration"
      />
      <div className="flex items-center justify-center my-32">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="profileCard flex items-center justify-center">
                <div className="overflow-hidden rounded-lg bg-base-200 w-[300px] shadow-lg relative ">
                  <div className="px-6 py-5 sm:px-6 flex flex-col items-center">
                    <ProfilePicSelector
                      userId={userId}
                      userData={userData}
                      setUserData={setUserData}
                    />
                    <div className="flex items-baseline gap-2 p-5">
                      <h3 className=" text-3xl font-semibold text-primary mt-4">
                        {username}
                      </h3>

                      <ReactCountryFlag
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                          marginRight: "0.5em",
                          borderRadius: "0.4em",
                        }}
                        countryCode={userData.countryCode}
                        svg
                        title={userData.countryCode}
                      />
                    </div>
                    <button className={getButtonClass()} onClick={handleCopy}>
                      {getButtonText()}
                    </button>
                  </div>

                  <div className="px-6 pb-5 flex flex-col items-center">
                    <progress
                      className="progress progress-primary custom-progress w-full"
                      value={userData.profileCompletionScore}
                      max="100"
                      role="progressbar"
                    ></progress>
                    <span className="text-center mt-2">
                      Profile completion {userData.profileCompletionScore}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="profileCard flex items-center justify-center ">
                <div className="overflow-hidden rounded-lg bg-base-200 sm:w-[600px] w-[300px] shadow-lg relative">
                  <div className="px-6 py-5 xs:mx-2 sm:px-6 flex flex-col">
                    <div className="border-primary mx-4 my-2 py-5 sm:p-0">
                      <dl className="divide-y divide-base-300 mx-4">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-lg font-medium text-bold">
                            First name
                          </dt>
                          <dd className="mt-1 text-lg sm:mt-0 sm:col-span-2">
                            {userData.firstName}
                          </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-lg font-medium text-bold">
                            Last name
                          </dt>
                          <dd className="mt-1 text-lg sm:mt-0 sm:col-span-2">
                            {userData.lastName}
                          </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-lg font-medium text-bold">
                            Email address
                          </dt>
                          <dd className="mt-1 text-lg sm:mt-0 sm:col-span-2">
                            {userData.email}
                          </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-lg font-medium text-bold">
                            Country
                          </dt>
                          <dd className=" mt-1 text-lg sm:mt-0 sm:col-span-2">
                            {userData.country}{" "}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="border-t-2 border-primary mx-4 my-2"></div>

                    <div className="px-6 py-5 flex justify-end">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-primary rounded-md shadow-sm"
                      >
                        <span className="hidden sm:inline">
                          Edit Profile info
                        </span>
                        <span>
                          <FaEdit className="inline sm:hidden" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <img
          className="absolute -bottom-6 -left-8 lg:-left-12 xl:left-12 2xl:-left-1 xl:-bottom-9 lg:h-1/3 xl:h-1/2 2xl:-bottom-11 hidden lg:block -z-20 4xl:-bottom-16 opacity-70"
          src="/images/profilePicBg2.png"
          alt="Sidebar illustration"
        />
      </div>
      <AnimatePresence>
        {isEditing && (
          // <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.5 },
              opacity: { duration: 0.2 },
            }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-lg p-6 w-96 shadow-[0_0_0_10000px_rgba(0,0,0,.40)]  ${
              isAnimating ? "overflow-hidden" : ""
            }`}
          >
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="float-right hover:cursor-pointer hover:scale-105 rounded"
            >
              <FaTimes size={22} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter yout first name..."
                value={userData.firstName}
                onChange={handleEditChange}
                className="mt-1 block w-full  border-gray-300 rounded p-2 focus:border-primary focus:ring-primary transition input-color"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter yout last name..."
                value={userData.lastName}
                onChange={handleEditChange}
                className="mt-1 block w-full  border-gray-300 rounded p-2 focus:border-primary focus:ring-primary transition input-color"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter yout email..."
                value={userData.email}
                onChange={handleEditChange}
                className="mt-1 block w-full  border-gray-300 rounded p-2 focus:border-primary focus:ring-primary transition input-color"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>

              <CountryDropdown
                userData={userData}
                handleEditChange={handleEditChange}
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
          </motion.div>
          //{" "}
          // </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
