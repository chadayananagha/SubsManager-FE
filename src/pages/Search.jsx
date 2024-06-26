import React, { useState, useEffect, useContext, useRef } from "react";
import CategoryCard from "../components/CategoryCard";
import PlatformCard from "../components/PlatformCard";
import Loading from "../components/Loading";
import categoryIcons from "../data/CategoryIcons";
import UserCard from "../components/UserCard";
import ChatWindow from "../components/ChatWindow";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import {
  fetchCategories,
  fetchCategoryPlatforms,
  fetchUsers,
  fetchUserById,
} from "../utils/api";
import { categoryIcons as categoryIcons2 } from "../utils/icons";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allPlatforms, setAllPlatforms] = useState([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [usersByPlatform, setUsersByPlatform] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [showUserCard, setShowUserCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const usersSectionRef = useRef(null);

  const handleOpenChat = (user) => {
    if (!token) {
      toast.error("You need to be logged in to send messages.", {
        duration: 1000,
        className: "bg-base-100 toast-style",
      });
      navigate(
        "/login",
        { state: { from: location.pathname } },
        { duration: 1000 }
      ); // Redirect to login page
      return;
    }
    setChatUser(user);
    setShowChatWindow(true);
    setShowUserCard(false);
  };

  const handleCloseChat = () => {
    setShowChatWindow(false);
  };

  useEffect(() => {
    const loadCategories = async () => {
      const uniqueCategories = await fetchCategories();
      setCategories(["All", ...uniqueCategories]);
    };

    const loadAllPlatforms = async () => {
      const data = await fetch(
        "https://subsmanager-be.onrender.com/subscriptions"
      );
      const subscriptions = await data.json();
      const platforms = [
        ...new Set(
          subscriptions
            .filter((subscription) => subscription.public) // Filter public subscriptions
            .map((subscription) => subscription.platformName)
        ),
      ];
      setAllPlatforms(platforms);
      setLoading(false);
    };

    loadCategories();
    loadAllPlatforms();
  }, []);

  useEffect(() => {
    if (selectedPlatform) {
      const loadUsersForPlatform = async () => {
        setLoading(true);
        const users = await fetchUsers(selectedPlatform);
        setUsersByPlatform((prevState) => ({
          ...prevState,
          [selectedPlatform]: users,
        }));
        setLoading(false);
      };
      loadUsersForPlatform();
    }
  }, [selectedPlatform]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setSelectedPlatform(null);
    setUsersByPlatform({});
    setSearchResults([]);
    setSearchInput("");

    setLoading(true);
    if (category === "All") {
      setFilteredPlatforms(allPlatforms);
    } else {
      const platforms = await fetchCategoryPlatforms(category);
      const uniquePlatforms = [...new Set(platforms)];
      setFilteredPlatforms(uniquePlatforms);
    }
    setLoading(false);
  };

  const handlePlatformClick = async (platformName) => {
    setSelectedPlatform(platformName);

    try {
      setLoading(true);
      const users = await fetchUsers(platformName);
      setUsersByPlatform((prevState) => ({
        ...prevState,
        [platformName]: users,
      }));
      setTimeout(() => {
        if (usersSectionRef.current) {
          usersSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (userId) => {
    try {
      setLoading(true);
      const user = await fetchUserById(userId);
      setSelectedUser({ ...user, platform: selectedPlatform });
      setShowUserCard(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setSelectedCategory(null);
    setSelectedPlatform(null);
    setUsersByPlatform({});
    const results = allPlatforms.filter((platform) =>
      platform.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  if (loading) {
    return (
      <div className="pt-24 h-screen flex justify-center items-center bg-base-200/100 absolute w-screen z-20">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="mt-28 flex justify-center md:justify-between flex-wrap gap-4 lg:mx-16">
        <div className="flex text-2xl md:text-3xl lg:text-4xl font-bold mx-4 lg:mx-[-1px] text-center">
          Select the Subscription!
        </div>
        <div className="mx-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search for Platforms"
              value={searchInput}
              onChange={handleInputChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xl font-semibold mb-2 lg:mx-12">Categories</p>
        <div className="lg:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between p-2 bg-primary text-white rounded"
          >
            <span>{selectedCategory || "Select a Category"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-6 h-6 ${
                isDropdownOpen ? "transform rotate-180" : ""
              }`}
            >
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.7-.29l-4-4a1 1 0 111.42-1.42L10 10.58l3.29-3.29a1 1 0 111.42 1.42l-4 4a1 1 0 01-.7.29z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="mt-2 rounded border border-slate-300 shadow-md">
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleCategoryClick(category);
                    setIsDropdownOpen(false);
                  }}
                  className="group p-2 cursor-pointer hover:bg-primary hover:text-white"
                >
                  <div className="relative overflow-hidden">
                    <span>{category}</span>{" "}
                    <span className="absolute right-0 -top-4 text-primary group-hover:text-base-100">
                      {categoryIcons2[category]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden lg:grid gap-4 grid-cols-2 lg:grid-cols-4 justify-items-center lg:mx-12">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category}
              subtitle={`Manage ${category}`}
              onClick={() => handleCategoryClick(category)}
              Icon={categoryIcons[category]}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap my-12 justify-center lg:mx-10">
        {(searchInput
          ? searchResults
          : selectedCategory
          ? filteredPlatforms
          : allPlatforms
        ).map((platformName, index) => (
          <PlatformCard
            key={index}
            platformName={platformName}
            onClick={() => handlePlatformClick(platformName)}
          />
        ))}
      </div>
      <div ref={usersSectionRef} className="user-list md:mx-auto mx-4 max-w-lg">
        {selectedPlatform &&
          Array.isArray(usersByPlatform[selectedPlatform]) && (
            // <ul className="text-center">
            //   <h1 className="text-center text-3xl font-bold mb-8">
            //     Available Users
            //   </h1>
            //   {usersByPlatform[selectedPlatform].map((user, index) => (
            //     <li
            //       key={index}
            //       onClick={() => handleUserClick(user._id)}
            //       className="bg-color p-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-primary text-black hover:text-white mb-4 rounded border border-slate-300 mx-auto w-3/4 md:w-1/2 font-bold flex items-center"
            //     >
            //       {user.profilePic ? (
            //         <img
            //           src={user.profilePic.url}
            //           alt={user.username}
            //           className="h-12 w-12 rounded-full mr-2"
            //         />
            //       ) : (
            //         <FaUser size={40} className="mr-2" />
            //       )}
            //       <span className="pl-8">{user.username}</span>
            //       <div className="w-4" /> {/* Add some space */}
            //     </li>
            //   ))}
            // </ul>
            <ul className="text-center">
              {usersByPlatform[selectedPlatform].filter(
                (user) => user._id !== userId
              ).length > 0 ? (
                <>
                  <h1 className="text-center text-3xl font-bold mb-8">
                    Available Users
                  </h1>
                  {usersByPlatform[selectedPlatform]
                    .filter((user) => user._id !== userId)
                    .map((user, index) => (
                      <li
                        key={index}
                        onClick={() => handleUserClick(user._id)}
                        className="bg-base-200 p-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-primary  hover:text-white mb-4 rounded border border-slate-300 mx-auto w-3/4 md:w-1/2 font-bold flex items-center"
                      >
                        {user.profilePic ? (
                          <img
                            src={user.profilePic.url}
                            alt={user.username}
                            className="h-12 w-12 rounded-full mr-2"
                          />
                        ) : (
                          <FaUser size={40} className="mr-2" />
                        )}
                        <span className="pl-8">{user.username}</span>
                        <div className="w-4" /> {/* Add some space */}
                      </li>
                    ))}
                </>
              ) : (
                <h1 className="text-center text-3xl font-bold mb-8">
                  No users found
                </h1>
              )}
            </ul>
          )}
      </div>

      {showUserCard && selectedUser && (
        <UserCard
          users={[selectedUser]}
          showModal={showUserCard}
          setShowModal={setShowUserCard}
          selectedPlatform={selectedPlatform}
          openChat={() => handleOpenChat(selectedUser)}
        />
      )}
      {showChatWindow && (
        <ChatWindow receiver={chatUser} onClose={handleCloseChat} />
      )}
    </div>
  );
};

export default Search;
