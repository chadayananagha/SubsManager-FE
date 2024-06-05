import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProfilePicUploader = () => {
  const authContext = useContext(AuthContext);
  const { userId } = authContext;
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("picture", selectedFile);

    try {
      setUploading(true);
      setError(null);

      const response = await axios.put(
        `http://localhost:8080/users/${userId}/profilePic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(response.data);
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
