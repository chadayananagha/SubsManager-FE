import React, { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import PlatformCard from "../components/PlatformCard";
import categoryIcons from "../data/CategoryIcons";
import {
  fetchCategories,
  fetchCategoryPlatforms,
  fetchUsers,
} from "../utils/api";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allPlatforms, setAllPlatforms] = useState([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const loadCategories = async () => {
      const uniqueCategories = await fetchCategories();
      setCategories(["All", ...uniqueCategories]); // Add "All" category manually
    };

    const loadAllPlatforms = async () => {
      const data = await fetch(
        "https://subsmanager-be.onrender.com/subscriptions"
      );
      const subscriptions = await data.json();
      const platforms = subscriptions.map(
        (subscription) => subscription.platformName
      );
      setAllPlatforms(platforms);
    };

    loadCategories();
    loadAllPlatforms();
  }, []);

  useEffect(() => {
    if (selectedPlatform) {
      const loadUsers = async () => {
        const users = await fetchUsers(selectedPlatform);
        setUsers(users);
      };
      loadUsers();
    }
  }, [selectedPlatform]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setSelectedPlatform(null); // Clear selected platform when category changes
    setUsers([]); // Clear users when category changes
    setSearchResults([]); // Clear search results when a category is clicked
    setSearchInput(""); // Clear search input when a category is clicked

    if (category === "All") {
      // If "All" category is selected, set all platforms
      setFilteredPlatforms(allPlatforms);
    } else {
      const platforms = await fetchCategoryPlatforms(category);
      setFilteredPlatforms(platforms);
    }
  };

  const handlePlatformClick = (platformName) => {
    setSelectedPlatform(platformName);
    setShowModal(true); // Show the modal when a platform is clicked
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setSelectedCategory(null); // Clear selected category when searching
    setSelectedPlatform(null); // Clear selected platform when searching
    setUsers([]); // Clear users when input changes
    if (e.key === "Enter") {
      setSearchInput(""); // Clear the search input on Enter
    } else {
      const results = allPlatforms.filter((platform) =>
        platform.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <>
      <div className="mt-28 flex justify-evenly flex-wrap gap-4">
        <div className="flex justify-center items-center text-4xl font-bold text-center">
          Select the Subscription!
        </div>
        <div>
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
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 justify-items-center lg:mx-12">
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

      {selectedPlatform && showModal && Array.isArray(users) && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          {users.map((user) => (
            <div
              className="modal-box shadow-[0_0_0_10000px_rgba(0,0,0,.40)]"
              key={user._id}
            >
              <h3 className="font-bold text-lg">{user.username}</h3>
              {user.sharedSubscriptions.map((subscription) => {
                const remainingSlots =
                  subscription.plan.maxMembers - subscription.members.length;

                return (
                  <div key={subscription._id}>
                    <p className="flex">
                      <p className="font-bold">Plan Name: </p>&nbsp;
                      {subscription.plan.planName}
                    </p>
                    <p className="flex">
                      <p className="font-bold">Price: </p>&nbsp;
                      {subscription.plan.price}€/month
                    </p>
                    <p className="flex">
                      <p className="font-bold">Max Members: </p>&nbsp;
                      {subscription.plan.maxMembers}
                    </p>
                    <p className="flex">
                      <p className="font-bold"> Remaining Slots: </p>&nbsp;
                      {remainingSlots}/{subscription.plan.maxMembers}
                    </p>
                  </div>
                );
              })}
              <div className="modal-action">
                <button className="btn" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button className="btn">Chat</button>
              </div>
            </div>
          ))}
        </dialog>
      )}
    </>
  );
};

export default Search;
