import { motion } from "framer-motion";
import { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { AuthContext } from "../context/AuthContext";
import { categoryIcons, getPlatformIcon } from "../utils/icons";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
const SearchPageAddForm = ({ openForm }) => {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    category: "Select your category",
    platformName: "",
    planName: "",
    price: "",
    maxMembers: "",
    expirationDate: "",
    public: false,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  //*form updating state
  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //* SetCategory state + open/close the dropdown
  const handleCategory = (category) => {
    setFormData((prev) => ({ ...prev, category: category }));
    setIsDropdownOpen(false);
  };
  //*handle the public state change
  const handlePublic = () => {
    setFormData((prev) => ({ ...prev, public: !prev.public }));
  };

  //*ref for clicking outside effect
  const formRef = useRef(null);

  //*On close set the states back to default
  const closeForm = () => {
    setFormData({
      category: "Select your category",
      platformName: "",
      planName: "",
      price: "",
      maxMembers: "",
      expirationDate: "",
      public: false,
    });
    openForm();
  };

  //*submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.category ||
      !formData.platformName ||
      !formData.planName ||
      formData.price <= 0 ||
      formData.maxMembers <= 0 ||
      !formData.expirationDate
    ) {
      const errorMessage = "Please fill in all fields";
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 1000,
        className: "bg-base-100 toast-style",
      });
      return;
    }
    setIsLoading(true);
    setError(null);
    console.log("token", token);
    try {
      const response = await axios.post(
        "https://subsmanager-be.onrender.com/subscriptions",
        {
          category: formData.category,
          platformName: formData.platformName,
          plan: {
            planName: formData.planName,
            price: formData.price,
            maxMembers: formData.maxMembers,
          },
          public: formData.public,
          expirationDate: formData.expirationDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adding the Authorization header
          },
        }
      );
      //   console.log(response.data);
      setIsLoading(false);
      toast.success("Subscription added successfully", {
        duration: 1000,
        className: "bg-base-100 toast-style",
      });
      closeForm();
    } catch (error) {
      toast.error(error.response.data.error, {
        duration: 1000,
        className: "bg-base-100 toast-style",
      });
      setIsLoading(false);
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  //* Effect to detect clicks outside the form
  useEffect(() => {
    const handleClickOutside = (e) => {
      //   console.log(formRef.current);
      if (
        !isLoading &&
        formRef.current &&
        !formRef.current.contains(e.target)
      ) {
        openForm(); // Close the form
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openForm, isLoading]);

  return (
    <motion.form
      key="form"
      ref={formRef}
      autoComplete="on"
      onSubmit={handleSubmit}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ height: { duration: 0.5 }, opacity: { duration: 0.2 } }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4  rounded-xl z-10 px-14 py-8 shadow-[0_0_0_10000px_rgba(0,0,0,.40)] bg-base-100 overflow-hidden"
    >
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100/70 w-full h-full z-30 flex justify-center items-center">
          <Loading />
        </div>
      )}
      <button
        onClick={openForm}
        type="button"
        className="absolute right-4 top-4 hover:cursor-pointer hover:scale-105 rounded"
      >
        <FaTimes size={22} />
      </button>
      <h3 className="text-xl">Add subscription</h3>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <label htmlFor="category" className="self-start -mb-2">
        Category
      </label>
      <div className="dropdown mx-12 w-full " name="category">
        <div
          tabIndex={0}
          role="button"
          className="px-4 py-2 rounded-lg input-color relative overflow-hidden "
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {formData.category}
          {categoryIcons[formData.category]}
        </div>
        {isDropdownOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 relative"
          >
            <li>
              <a onClick={() => handleCategory("Entertainment")}>
                Entertainment
              </a>
            </li>
            <li>
              <a onClick={() => handleCategory("Music")}>Music</a>
            </li>
            <li>
              <a onClick={() => handleCategory("Gaming")}>Gaming</a>
            </li>
            <li>
              <a onClick={() => handleCategory("e-Learning")}>e-Learning</a>
            </li>
            <li>
              <a onClick={() => handleCategory("Office")}>Office</a>
            </li>
            <li>
              <a onClick={() => handleCategory("Sports")}>Sports</a>
            </li>
            <li>
              <a onClick={() => handleCategory("Other")}>Other</a>
            </li>
          </ul>
        )}
      </div>
      <label htmlFor="platformName" className="self-start -mb-2">
        Platform Name
      </label>
      <div className="relative mx-12 flex w-full overflow-hidden  ">
        <input
          onChange={handleOnChange}
          value={formData.platformName}
          placeholder="Enter platform name..."
          name="platformName"
          type="text"
          className="w-full px-4 py-2 rounded-lg input-color "
        />
        {getPlatformIcon(formData.platformName)}
      </div>
      <label htmlFor="planName" className="self-start -mb-2">
        Plan Name:
      </label>
      <input
        onChange={handleOnChange}
        value={formData.planName}
        placeholder="Enter plan name..."
        name="planName"
        type="text"
        className="mx-12 w-full px-4 py-2 rounded-lg input-color"
      />
      <div className="flex justify-center items-center gap-12">
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="price" className="self-start ">
            Price:
          </label>
          <input
            onChange={handleOnChange}
            value={formData.price}
            min={1}
            name="price"
            type="number"
            className="mx-12 w-full px-4 py-2 rounded-lg input-color"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="maxMembers" className="self-start ">
            Max. members:
          </label>
          <input
            onChange={handleOnChange}
            value={formData.maxMembers}
            min={1}
            name="maxMembers"
            type="number"
            className="mx-12 w-full px-4 py-2 rounded-lg input-color"
          />
        </div>
      </div>
      <label htmlFor="expiration" className="self-start -mb-2">
        Expiration Date:
      </label>
      <input
        onChange={handleOnChange}
        value={formData.expirationDate}
        min={today}
        name="expirationDate"
        type="date"
        className="mx-12 w-full px-4 py-2 rounded-lg input-color"
      />
      <div className="flex w-full justify-evenly">
        <label htmlFor="public" className="">
          Public
        </label>
        <input
          checked={formData.public}
          onChange={handlePublic}
          name="public"
          type="checkbox"
          className="checkbox -ml-8"
        />
      </div>
      <button className="self-end btn btn-primary mt-4">Submit</button>
    </motion.form>
  );
};

export default SearchPageAddForm;

//*SubSchema
// Category
// Platform Name
// Plan : planName, price, maxMemb
// public: y/n

// expirationDate
