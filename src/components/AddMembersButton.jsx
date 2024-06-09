import axios from "axios";
import { platformName } from "../utils/icons";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io";
import Loading from "./Loading";
const AddMembersButton = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [sharedSub, setSharedSub] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const { userId, token } = authContext;
  console.log(subscription);
  // console.log(subscription?.platformName);

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
          toast.error("Unexpected error! Try again Later");
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
        const response = await axios.get(
          `https://subsmanager-be.onrender.com/subscriptions/${subscription._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Adding the Authorization header
            },
          }
        );
        console.log(response.data);
        setIsLoading(false);
        setError(null);
      } catch (error) {}
    };
    fetchSub();
  }, [subscription]);

  const handleSubscriptionSelect = (selectedSub) => {
    setSubscription(selectedSub);
    setIsDropdownOpen(false);
  };
  return (
    <>
      {isAdding && (
        <motion.form
          key="form"
          autoComplete="on"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ height: { duration: 0.5 }, opacity: { duration: 0.2 } }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4  rounded-xl z-10 px-14 py-8 shadow-[0_0_0_10000px_rgba(0,0,0,.40)] bg-base-100 "
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
          <div className="dropdown mx-12 w-full " name="category">
            <div
              tabIndex={0}
              role="button"
              className="px-16  py-2 rounded-lg input-color relative overflow-hidden  "
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
            </div>
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
          </div>

          <div>Category: {subscription.category}</div>
          <div>
            {subscription.members.length}/{subscription.plan.maxMembers}
          </div>
          <div>{subscription.plan.planName}</div>
          <div>{subscription.plan.price}</div>
        </motion.form>
      )}
      <div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn btn-primary"
        >
          Add members
        </button>
      </div>
    </>
  );
};

export default AddMembersButton;
