import axios from "axios";
import { platformName } from "../utils/icons";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { MdPersonAdd } from "react-icons/md";
const AddMembersButton = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [sharedSub, setSharedSub] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userIdToBeAdded, setUserIdToBeAdded] = useState("");
  const [userToBeAdded, setUserToBeAdded] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const authContext = useContext(AuthContext);
  const { userId, token } = authContext;
  // console.log(subscription);
  // console.log(subscription?.platformName);

  //*open the form
  const handleOpenForm = () => {
    setIsAdding(!isAdding);
    setSubscription("");
    setUserIdToBeAdded("");
  };

  //*get user shared subs
  useEffect(() => {
    if (isAdding) {
      const fetchUser = async () => {
        setIsAdding(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://subsmanager-be.onrender.com/users/${userId}`
          );
          // console.log(response.data.sharedSubscriptions);
          setSharedSub(response.data.sharedSubscriptions);
        } catch (error) {
          setIsLoading(false);
          setError(error.response.data.error);
          toast.error(error.response.data.error, {
            duration: 1000,
            className: "bg-base-100 toast-style",
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    }
  }, [isAdding]);
  // console.log(sharedSub);

  //*get selected Sub info
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchSub = async () => {
      try {
        if (subscription) {
          const response = await axios.get(
            `https://subsmanager-be.onrender.com/subscriptions/${subscription._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(response.data);
          setIsLoading(false);
          setError(null);
        }
      } catch (error) {
        setError(error?.response?.error?.data);
      }
    };
    fetchSub();
  }, [subscription]);

  //*Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId === userIdToBeAdded) {
      setIsConfirm(false);
      setError("You can't add your own userID");
      toast.error("You can't add your own userID", {
        duration: 1000,
        className: "bg-base-100 toast-style",
      });

      return;
    }
    if (subscription.members.includes(userIdToBeAdded)) {
      setIsLoading(false);
      setError("The user is already a member");
      toast.error("The user is already a member", {
        duration: 1000,
        className: "bg-base-100 toast-style",
      });
      return;
    }
    const fetchUserToBeAdded = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://subsmanager-be.onrender.com/users/${userIdToBeAdded}`
        );
        setUserToBeAdded(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsConfirm(false);
        setError("User doesn't exists");
        toast.error("User doesn't exists", {
          duration: 1000,
          className: "bg-base-100 toast-style",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserToBeAdded();
    setIsConfirm(true);
  };
  //*confirming
  const handleAddMember = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `https://subsmanager-be.onrender.com/subscriptions/${subscription._id}`,
        { members: [userToBeAdded._id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      setIsLoading(false);
      setIsConfirm(false);
      toast.success("User added successfully", {
        duration: 1000,
        className: "bg-base-100 toast-style",
      });
      handleOpenForm();
    } catch (error) {
      setIsLoading(false);
      setIsConfirm(false);
      setError(error.response?.data.error);
      toast.error(error.response?.data.error, {
        duration: 1000,
        className: "bg-base-100 toast-style",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(userToBeAdded);
  // console.log(subscription);
  // console.log(subscription?.members.includes(userIdToBeAdded));
  // console.log(userToBeAdded);

  //*ref for clicking outside effect
  const formRef = useRef(null);

  //*clicking outside of the form
  useEffect(() => {
    const clickOutside = (e) => {
      if (
        !isLoading &&
        formRef.current &&
        !formRef.current.contains(e.target)
      ) {
        handleOpenForm();
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [handleOpenForm, isLoading]);

  const handleSubscriptionSelect = (selectedSub) => {
    setSubscription(selectedSub);
    setIsDropdownOpen(false);
  };
  return (
    <>
      {isAdding && (
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          key="form"
          autoComplete="on"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ height: { duration: 0.5 }, opacity: { duration: 0.2 } }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4  rounded-lg z-10 px-14 py-8 shadow-[0_0_0_10000px_rgba(0,0,0,.40)] bg-base-100"
        >
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100/70 w-full h-full z-30 flex justify-center items-center">
              <Loading />
            </div>
          )}
          <h3 className="text-xl">Add Member</h3>
          <label htmlFor="subscription" className="self-start -mb-2">
            Select Subscription
          </label>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="dropdown mx-24 w-full   "
            name="category"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              tabIndex={0}
              role="button"
              className="px-4  py-2 rounded-lg input-color relative overflow-hidden  "
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {subscription
                ? subscription.platformName
                : "Select subscriptions"}

              {subscription ? (
                platformName[subscription.platformName]
              ) : (
                <IoMdArrowDropdown className="absolute top-1/2 bottom-1/2 -translate-y-1/2 right-4 text-3xl" />
              )}
            </motion.div>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 relative"
              >
                {sharedSub.map((sub) => (
                  <li key={sub._id}>
                    <a onClick={() => handleSubscriptionSelect(sub)}>
                      {sub.platformName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
          {subscription && (
            <>
              <div className="flex flex-col gap-4 text-xs w-full border-b border-primary pb-2">
                <div className="flex justify-between">
                  <div>Category: {subscription.category}</div>
                  <div>Plan: {subscription.plan.planName}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    Members: {subscription.members.length}/
                    {subscription.plan.maxMembers}
                  </div>
                  <div>Price: {subscription?.plan.price} €</div>
                </div>
              </div>
              <label htmlFor="userId" className="self-start -mb-2 ">
                Enter userID
              </label>
              <input
                value={userIdToBeAdded}
                onChange={(e) => setUserIdToBeAdded(e.target.value)}
                className="w-full px-4 py-2 rounded-lg input-color "
                type="text"
                name="userId"
                placeholder="Enter userID..."
                required
              />
              {error && (
                <p className="text-red-500 font-bold mt-4  w-full text-center text-balance p-4 rounded-lg">
                  {error}
                </p>
              )}
              <button
                className="btn btn-primary self-end mt-4"
                disabled={isConfirm}
              >
                Add
              </button>
            </>
          )}
          {!isLoading && isConfirm && (
            <div className="bg-base-100 p-12 rounded-lg absolute flex flex-col gap-8 items-center justify-center shadow-[0_0_0_10000px_rgba(0,0,0,.40)]">
              <h2>Are you sure you want to add:</h2>
              <div className="flex justify-center items-center gap-4">
                {userToBeAdded.profilePic ? (
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={userToBeAdded.profilePic.url} />
                    </div>
                  </div>
                ) : (
                  <FaUser className="text-xl" />
                )}
                <p>{userToBeAdded.username}</p>
              </div>
              <p>to your subscription?</p>
              <div className="flex gap-4 ">
                <button
                  onClick={() => {
                    setIsConfirm(false);
                    setUserIdToBeAdded("");
                  }}
                  className="btn bg-red-600 hover:bg-red-700"
                >
                  Cancel
                </button>
                <button onClick={handleAddMember} className="btn btn-primary">
                  Confirm
                </button>
              </div>
            </div>
          )}
        </motion.form>
      )}
      <div>
        <button
          onClick={handleOpenForm}
          className="btn btn-primary"
          disabled={isAdding}
        >
          <span className="block md:hidden">
            <MdPersonAdd />
          </span>
          <span className="hidden md:block">Add members</span>
        </button>
      </div>
    </>
  );
};

export default AddMembersButton;
