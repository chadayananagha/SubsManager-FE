import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProfilePicUploader = () => {
  const authContext = useContext(AuthContext);
  const { userId, updateProfilePic } = authContext;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const defaultAvatars = [
    "/images/av1.jpg",
    "/images/av2.jpg",
    "/images/av3.jpg",
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setSelectedAvatar(null); // Clear avatar selection
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setPreview(avatar);
    setSelectedFile(null); // Clear file selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile && !selectedAvatar) {
      setError("Please select a file to upload or choose an avatar");
      return;
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.append("picture", selectedFile);
    } else {
      formData.append("avatarUrl", selectedAvatar);
    }

    try {
      setUploading(true);
      setError(null);

      const response = await axios.put(
        `http://localhost:8080/users/${userId}/profilePic`,
        selectedFile ? formData : { avatarUrl: selectedAvatar },
        {
          headers: {
            "Content-Type": selectedFile
              ? "multipart/form-data"
              : "application/json",
          },
        }
      );

      setUser(response.data);
      updateProfilePic(response.data.profilePic);
      console.log(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while uploading the file"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Profile Picture</h2>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <div>
          <h3>Or select a default avatar:</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            {defaultAvatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                style={{
                  width: "150px",
                  height: "150px",
                  cursor: "pointer",
                  border: selectedAvatar === avatar ? "2px solid blue" : "none",
                }}
                onClick={() => handleAvatarSelect(avatar)}
              />
            ))}
          </div>
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && (
        <p>Profile picture updated successfully for user: {user.name}</p>
      )}
    </div>
  );
};

export default ProfilePicUploader;
