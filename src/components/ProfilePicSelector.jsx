import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineImageSearch } from "react-icons/md";
import Image1 from "../../public/images/User1.png";
import Image2 from "../../public/images/User2.png";
import Image3 from "../../public/images/User3.png";
import Image4 from "../../public/images/User4.png";
import Image5 from "../../public/images/User5.png";
import Image6 from "../../public/images/User6.png";
import Image7 from "../../public/images/User7.png";
import Image8 from "../../public/images/User8.png";
import Image9 from "../../public/images/User9.png";
import Image10 from "../../public/images/User10.png";

const ProfilePicSelector = ({ userData, setUserData, userId }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const presetImages = [
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
    Image10,
  ];

  const localAPI = "http://localhost:8080";
  const deployedAPI = "https://subsmanager-be.onrender.com";

  const handleImageClick = async (image, index) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], `preset-${image.split("/").pop()}`, {
        type: blob.type,
      });
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Set the preview URL
      setSelectedIndex(index);
    } catch (error) {
      console.error("Error converting image to file:", error);
    }
  };

  const handleFileSelect = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreviewUrl(URL.createObjectURL(file)); // Set the preview URL
    setSelectedIndex(null);
  };

  const uploadProfilePic = async () => {
    if (!selectedImage) return;
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("url", selectedImage);

      const response = await axios.post(
        `${localAPI}/users/upload/${userId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData({
        ...userData,
        profilePic: imagePreviewUrl,
      });

      setIsUploading(false);
      setIsModalOpen(false); // Close the modal after uploading
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="relative w-32 h-32">
        <img
          src={userData.profilePic.url || imagePreviewUrl}
          alt="User profile pic"
          className="w-full h-full rounded-full shadow-lg cursor-pointer"
        />
        <div
          onClick={() => setIsModalOpen(true)}
          className="absolute inset-0 flex items-center justify-center bg-white opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-full cursor-pointer"
        >
          {/* Icon */}
          <MdOutlineImageSearch className="h-12 w-12 text-primary" />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold mb-4">
              Select Profile Picture
            </h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {presetImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preset Image ${index + 1}`}
                  className={`w-28 h-28 object-cover rounded-full shadow-lg cursor-pointer ${
                    selectedIndex === index ? "border-4 border-blue-500" : ""
                  }`}
                  onClick={() => handleImageClick(image, index)}
                />
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input">
              <div className="w-full shadow-lg cursor-pointer flex items-center justify-center  bg-base-200 hover:bg-base-300 p-2 rounded">
                Browse
              </div>
            </label>
            <button
              onClick={uploadProfilePic}
              disabled={!selectedImage || isUploading}
              className="btn btn-primary text-white font-bold py-2 px-4 rounded mt-8"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicSelector;
