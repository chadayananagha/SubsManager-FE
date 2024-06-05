import { useJwt } from "react-jwt";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import ProfilePicUploader from "../components/ProfilePicUploader";
const UserProfile = () => {
  const { userId, token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const username = decodedToken?.username;
  // console.log(decodedToken);
  return (
    <div className="pt-24 flex-1">
      <div className="bg-green-300">{username}</div>
      <div className="bg-blue-300">{userId}</div>
      <ProfilePicUploader userId={userId} />
    </div>
  );
};

export default UserProfile;
