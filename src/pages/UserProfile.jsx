// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Avatar,
//   Typography,
//   Tooltip,
//   Button,
// } from "@material-tailwind/react";
// import { PencilIcon } from "@heroicons/react/24/solid";
// import { Link } from "react-router-dom";
// import ProfileInfoCard from "../components/ProfileInfoCard";
// import conversationsData from "../utils/conversationsData";
// import MessageCard from "../components/MessageCard";
// import platformsData from "../utils/platformsData";
// import axios from "axios";

// export function UserProfile() {
//   return (
//     <>
//       <div className="relative mt-24 h-72 w-full overflow-hidden rounded-xl bg-coverpt bg-center ">
//         <div className="absolute inset-0 h-full w-full bg-primary" />
//       </div>
//       <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
//         <CardBody className="p-12">
//           <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
//             <div className="flex items-center gap-10">
//               <Avatar
//                 src="PROFILEPIC"
//                 alt="USERNAMEPIC"
//                 size="xl"
//                 variant="rounded"
//                 className="rounded-lg shadow-lg shadow-blue-gray-500/40"
//               />
//               <div>
//                 <Typography variant="h2" color="blue-gray" className="mb-1">
//                   USERNAME
//                 </Typography>
//                 <Typography
//                   variant="small"
//                   className="font-normal text-blue-gray-600"
//                 ></Typography>
//               </div>
//             </div>
//           </div>
//           <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
//             <ProfileInfoCard
//               title="Profile Information"
//               description=""
//               details={{
//                 "first name": "FIRSTNAME",
//                 "last name": "LASTNAME",
//                 mobile: "PHONE NUMBER",
//                 email: "EMAIL",
//                 location: "COUNTRY",
//               }}
//               action={
//                 <Tooltip className="text-secondary" content="Edit Profile">
//                   <PencilIcon className="h-4 w-4 cursor-pointer text-primary" />
//                 </Tooltip>
//               }
//             />
//             <div>
//               <Typography variant="h6" color="blue-gray" className="mb-3">
//                 Messages
//               </Typography>
//               <ul className="flex flex-col gap-6">
//                 {conversationsData.map((props) => (
//                   <MessageCard
//                     key={props.name}
//                     {...props}
//                     action={
//                       <Button
//                         className="btn btn-primary text-white text-l rounded-3xl "
//                         variant="text"
//                         size="sm"
//                       >
//                         reply
//                       </Button>
//                     }
//                   />
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="px-4 pb-4">
//             <Typography variant="h6" color="blue-gray" className="mb-2">
//               Current platforms
//             </Typography>
//             <Typography
//               variant="small"
//               className="font-normal text-blue-gray-500"
//             ></Typography>
//             <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
//               {platformsData.map(({ img, platform, category, plan, title }) => (
//                 <Card key={title} color="transparent" shadow={false}>
//                   <CardHeader
//                     floated={false}
//                     color="gray"
//                     className="mx-0 mt-0 mb-4 h-64 xl:h-40"
//                   >
//                     <img
//                       src={img}
//                       alt={title}
//                       className="h-full w-full object-cover"
//                     />
//                   </CardHeader>
//                   <CardBody className="py-0 px-1">
//                     <Typography
//                       variant="small"
//                       className="font-normal text-blue-gray-500"
//                     >
//                       {category}
//                     </Typography>
//                     <Typography
//                       variant="h5"
//                       color="blue-gray"
//                       className="mt-1 mb-2"
//                     >
//                       {platform}
//                     </Typography>
//                     <Typography
//                       variant="small"
//                       className="font-normal text-blue-gray-500"
//                     >
//                       {plan}
//                     </Typography>
//                   </CardBody>
//                 </Card>
//               ))}
//             </div>
//           </div>
//           <div>
//             <button className="btn bg-wari">Logout</button>
//           </div>
//         </CardBody>
//       </Card>
//       <div></div>
//     </>
//   );
// }

// export default UserProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import ProfileInfoCard from "../components/ProfileInfoCard";
import conversationsData from "../utils/conversationsData";
import MessageCard from "../components/MessageCard";
import platformsData from "../utils/platformsData";
import { Link } from "react-router-dom";

export function UserProfile() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://subsmanager-be.onrender.com/user/YOUR_USER_ID"
        ); // Replace YOUR_USER_ID with the actual user ID
        setUserData(response.data);
        setEditData(response.data); // Initialize editData with fetched data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://subsmanager-be.onrender.com/user/${userData._id}`,
        editData
      );
      setUserData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>
      <div className="relative mt-24 h-72 w-full overflow-hidden rounded-xl bg-coverpt bg-center ">
        <div className="absolute inset-0 h-full w-full bg-primary" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-12">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-10">
              <Avatar
                src={userData.profilePic || "default-profile-pic-url"}
                alt={userData.username || "User"}
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h2" color="blue-gray" className="mb-1">
                  {userData.username}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                ></Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <ProfileInfoCard
              title="Profile Information"
              description=""
              details={{
                "first name": isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange}
                  />
                ) : (
                  userData.firstName
                ),
                "last name": isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleChange}
                  />
                ) : (
                  userData.lastName
                ),
                mobile: isEditing ? (
                  <input
                    type="text"
                    name="mobile"
                    value={editData.mobile}
                    onChange={handleChange}
                  />
                ) : (
                  userData.mobile
                ),
                email: isEditing ? (
                  <input
                    type="text"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                  />
                ) : (
                  userData.email
                ),
                location: isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={editData.country}
                    onChange={handleChange}
                  />
                ) : (
                  userData.country
                ),
              }}
              action={
                <Tooltip className="text-secondary" content="Edit Profile">
                  <PencilIcon
                    className="h-4 w-4 cursor-pointer text-primary"
                    onClick={handleEditClick}
                  />
                </Tooltip>
              }
            />
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Messages
              </Typography>
              <ul className="flex flex-col gap-6">
                {conversationsData.map((props) => (
                  <MessageCard
                    key={props.name}
                    {...props}
                    action={
                      <Button
                        className="btn btn-primary text-white text-l rounded-3xl "
                        variant="text"
                        size="sm"
                      >
                        reply
                      </Button>
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Current platforms
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            ></Typography>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {platformsData.map(({ img, platform, category, plan, title }) => (
                <Card key={title} color="transparent" shadow={false}>
                  <CardHeader
                    floated={false}
                    color="gray"
                    className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                  >
                    <img
                      src={img}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody className="py-0 px-1">
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {category}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mt-1 mb-2"
                    >
                      {platform}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {plan}
                    </Typography>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
          {isEditing && (
            <div>
              <Button onClick={handleSave} variant="contained" color="primary">
                Save
              </Button>
            </div>
          )}
          <div>
            <button className="btn bg-wari">Logout</button>
          </div>
        </CardBody>
      </Card>
      <div></div>
    </>
  );
}

export default UserProfile;
