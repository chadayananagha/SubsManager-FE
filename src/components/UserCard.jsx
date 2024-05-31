import React from "react";
import { FaCircle, FaTimes, FaUser } from "react-icons/fa";

const UserCard = ({ users, showModal, setShowModal, selectedPlatform }) => {
  if (!users || users.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  return (
    <dialog
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
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
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => setShowModal(false)}
          >
            <FaTimes size={24} />
          </button>
          <div className="font-bold text-2xl mb-4 flex justify-center items-center">
            <FaUser className="mr-2" />
            <p className="flex-1 text-center">Owner:&nbsp;{user.username}</p>
          </div>
          {user.sharedSubscriptions
            .filter(
              (subscription) => subscription.platformName === selectedPlatform
            )
            .map((subscription) => {
              const remainingSlots =
                subscription.plan.maxMembers - subscription.members.length;
              const slots = Array.from(
                Array(subscription.plan.maxMembers).keys()
              );

              return (
                <div key={subscription._id}>
                  <p className="flex my-2">
                    <span className="font-bold">Platform </span>&nbsp;
                    <p>{subscription.platformName}</p>
                  </p>
                  <hr className="transition-opacity duration-500" />
                  <p className="flex  my-2">
                    <span className="font-bold">Plan Name </span>&nbsp;
                    {subscription.plan.planName}
                  </p>
                  <hr className="transition-opacity duration-500" />
                  <p className="flex  my-2">
                    <span className="font-bold">Price </span>&nbsp;
                    {subscription.plan.price}€/month
                  </p>
                  <hr className="transition-opacity duration-500" />
                  <p className="flex  my-2">
                    <span className="font-bold">Expires on </span>&nbsp;
                    {formatDate(subscription.expirationDate)}
                    {/* {subscription.expirationDate} */}
                  </p>
                  <hr className="transition-opacity duration-500" />
                  <p className="flex my-2">
                    <span className="font-bold">Max Members </span>&nbsp;
                    {subscription.plan.maxMembers}
                  </p>
                  <hr className="transition-opacity duration-500" />
                  <div className="flex flex-wrap my-2">
                    <span className="font-bold mr-4"> Remaining slots</span>
                    &nbsp;
                    {slots.map((slot, index) => (
                      <FaCircle
                        key={index}
                        style={{
                          color: index < remainingSlots ? "green" : "red",
                        }}
                        className="mr-1 mt-1"
                      />
                    ))}
                  </div>
                  <hr className="bg-primary h-1 border-0 transition-opacity duration-500" />
                </div>
              );
            })}
          <div className="modal-action">
            <button className="btn btn-primary">Message</button>
          </div>
        </div>
      ))}
    </dialog>
  );
};

export default UserCard;
