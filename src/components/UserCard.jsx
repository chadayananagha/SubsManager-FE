// import React from "react";

// const UserCard = ({ users, showModal, setShowModal }) => {
//   return (
//     <dialog
//       id="my_modal_5"
//       className="modal modal-bottom sm:modal-middle"
//       open={showModal}
//     >
//       {users.map((user) => (
//         <div
//           className="modal-box shadow-[0_0_0_10000px_rgba(0,0,0,.40)]"
//           key={user._id}
//         >
//           <h3 className="font-bold text-lg">{user.username}</h3>
//           {user.sharedSubscriptions.map((subscription) => {
//             const remainingSlots =
//               subscription.plan.maxMembers - subscription.members.length;

//             return (
//               <div key={subscription._id}>
//                 <p className="flex">
//                   <p className="font-bold">Plan Name: </p>&nbsp;
//                   {subscription.plan.planName}
//                 </p>
//                 <p className="flex">
//                   <p className="font-bold">Price: </p>&nbsp;
//                   {subscription.plan.price}€/month
//                 </p>
//                 <p className="flex">
//                   <p className="font-bold">Max Members: </p>&nbsp;
//                   {subscription.plan.maxMembers}
//                 </p>
//                 <p className="flex">
//                   <p className="font-bold"> Remaining Slots: </p>&nbsp;
//                   {remainingSlots}/{subscription.plan.maxMembers}
//                 </p>
//               </div>
//             );
//           })}
//           <div className="modal-action">
//             <button
//               className="btn btn-primary"
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//             <button className="btn btn-primary">Chat</button>
//           </div>
//         </div>
//       ))}
//     </dialog>
//   );
// };

// export default UserCard;
import React from "react";

const UserCard = ({ users, showModal, setShowModal }) => {
  return (
    <dialog
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
      open={showModal}
    >
      {users.map((user) => (
        <div
          className="modal-box shadow-[0_0_0_10000px_rgba(0,0,0,.40)]"
          key={user._id}
        >
          <h3 className="font-bold text-2xl mb-4">
            Owner:&nbsp;{user.username}
          </h3>
          {user.sharedSubscriptions.map((subscription) => {
            const remainingSlots =
              subscription.plan.maxMembers - subscription.members.length;

            return (
              <div key={subscription._id}>
                <p className="flex mb-4">
                  <span className="font-bold">Plan Name: </span>&nbsp;
                  {subscription.plan.planName}
                </p>
                <hr className="transition-opacity duration-500" />
                <p className="flex mb-4">
                  <span className="font-bold">Price: </span>&nbsp;
                  {subscription.plan.price}€/month
                </p>
                <hr className="transition-opacity duration-500" />
                <p className="flex mb-4">
                  <span className="font-bold">Max Members: </span>&nbsp;
                  {subscription.plan.maxMembers}
                </p>
                <hr className="transition-opacity duration-500" />
                <p className="flex mb-4">
                  <span className="font-bold">Remaining Slots: </span>&nbsp;
                  {remainingSlots}/{subscription.plan.maxMembers}
                </p>
                <hr className="transition-opacity duration-500" />
              </div>
            );
          })}
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button className="btn btn-primary">Chat</button>
          </div>
        </div>
      ))}
    </dialog>
  );
};

export default UserCard;
