import React from "react";
import { FaCircle, FaTimes, FaUser } from "react-icons/fa";

const UserCard = ({
  users,
  showModal,
  setShowModal,
  selectedPlatform,
  openChat,
}) => {
  if (!users || users.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const isExpired = date < today;
    const formattedDate = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return { formattedDate, isExpired };
  };

  return (
    <dialog
      id="my_modal_5"
      className="modal modal-middle px-2"
      open={showModal}
      onClick={() => setShowModal(false)}
    >
      {users.map((user) => (
        <div
          className="modal-box shadow-[0_0_0_10000px_rgba(0,0,0,.40)] relative"
          key={user._id}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 "
            onClick={() => setShowModal(false)}
          >
            <FaTimes size={24} />
          </button>
          <div className="font-bold text-2xl mb-4 flex justify-center items-center">
            {user.profilePic ? (
              <img
                src={user.profilePic.url}
                alt="Profile"
                className="mr-2 h-14 w-14 rounded-full"
              />
            ) : (
              <FaUser className="mr-2" size={30} />
            )}
            <span className="flex-1 text-center ml-2">
              Owner: {user.username}
            </span>
          </div>
          {user.sharedSubscriptions
            .filter(
              (subscription) => subscription.platformName === selectedPlatform
            )
            .map((subscription) => {
              const { formattedDate, isExpired } = formatDate(
                subscription.expirationDate
              );
              const remainingSlots =
                subscription.plan.maxMembers - subscription.members.length;
              const slots = [...Array(subscription.plan.maxMembers).keys()];

              return (
                <div key={subscription._id}>
                  <p className="flex my-2">
                    <span className="font-bold">Platform</span>
                    <p className="ml-4">{subscription.platformName}</p>
                  </p>
                  <hr className="transition-opacity duration-500" />
                  <p className="flex my-2">
                    <span className="font-bold">Plan Name</span>
                    <p className="ml-4">{subscription.plan.planName}</p>
                  </p>
                  <hr className="transition-opacity duration-500" />
                  <p className="flex my-2">
                    <span className="font-bold">Total Price</span>
                    <p className="ml-4">{subscription.plan.price} €/month</p>
                  </p>
                  <hr className="transition-opacity duration-500" />
                  <p className="flex my-2">
                    <span className="font-bold">Price per slot</span>
                    <p className="ml-4">
                      {(
                        subscription.plan.price / subscription.plan.maxMembers
                      ).toFixed(2)}{" "}
                      €/month
                    </p>
                  </p>
                  <hr className="transition-opacity duration-500" />
                  <p className="flex my-2">
                    <span className="font-bold">Expires on</span>
                    <p className="ml-4">
                      {formattedDate} {isExpired && "(Expired)"}
                    </p>
                  </p>
                  <hr className="transition-opacity duration-500" />
                  <p className="flex my-2">
                    <span className="font-bold">Max Members</span>
                    <p className="ml-4">{subscription.plan.maxMembers}</p>
                  </p>
                  <hr className="transition-opacity duration-500" />
                  <div className="flex flex-wrap my-2">
                    <span className="font-bold mr-4">Remaining slots</span>
                    {slots.map((index) => (
                      <FaCircle
                        key={index}
                        style={{
                          color: index < remainingSlots ? "green" : "red",
                        }}
                        className="mt-1 ml-1"
                      />
                    ))}
                  </div>
                  <hr className="bg-primary h-1 border-0 transition-opacity duration-500" />
                </div>
              );
            })}
          <div className="modal-action">
            <button className="btn btn-primary" onClick={openChat}>
              Message
            </button>
          </div>
        </div>
      ))}
    </dialog>
  );
};

export default UserCard;
