import React, { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import PlatformCard from "../components/PlatformCard";
import Loading from "../components/Loading";
import categoryIcons from "../data/CategoryIcons";
import UserCard from "../components/UserCard";
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
  const [loading, setLoading] = useState(true);

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
      const platforms = subscriptions.map(
        (subscription) => subscription.platformName
      );
      setAllPlatforms(platforms);
      setLoading(false); // Set loading to false after data is loaded
    };

    loadCategories();
    loadAllPlatforms();
  }, []);

  useEffect(() => {
    if (selectedPlatform) {
      const loadUsers = async () => {
        setLoading(true);
        const users = await fetchUsers(selectedPlatform);
        setUsers(users);
        setLoading(false);
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

    setLoading(true);
    if (category === "All") {
      setFilteredPlatforms(allPlatforms);
    } else {
      const platforms = await fetchCategoryPlatforms(category);
      setFilteredPlatforms(platforms);
    }
    setLoading(false);
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

  if (loading) {
    return (
      <div className="pt-24 h-screen flex justify-center items-center bg-base-200/100 absolute w-screen z-20">
        <Loading />
      </div>
    );
  }

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
        <UserCard
          users={users}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default Search;
