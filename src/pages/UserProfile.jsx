import { useJwt } from "react-jwt";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const UserProfile = () => {
  const { userId, token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const username = decodedToken?.username;
  // console.log(decodedToken);
  return (
    <div>
      <div className="bg-green-300">{username}</div>
      <div className="bg-blue-300">{userId}</div>
    </div>
  );
};

export default UserProfile;
