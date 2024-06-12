import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
const SignUp = () => {
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://subsmanager-be.onrender.com/users/signup",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      const data = response.data;
      // console.log(data);

      // localStorage.setItem("token", data.token);
      setIsLoading(false);
      login(data.token, data.userId);
      toast.success("Registered successfully", {
        duration: 1000,
        className: "bg-base-100 toast-style",
      });
      setTimeout(() => {
        navigate("/");
      }, 600);
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

  return (
    <>
      <div
        className={`${
          isLoading
            ? "pt-24 min-h-screen flex justify-center items-center bg-base-200/50 absolute w-full z-20 "
            : "hidden"
        }`}
      >
        <Loading />
      </div>
      <motion.div
        initial={{ opacity: 0, y: "-10%" }}
        animate={{ opacity: 1, y: "0" }}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap justify-center items-center lg:mx-24 min-h-screen"
      >
        <div className="flex flex-col  sm:px-52 px-4 w-full sm:w-[50%] items-center">
          <h1 className="text-5xl font-bold mb-12">SignUp</h1>
          <form
            className="flex flex-col items-center gap-8"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered sm:w-96  bg-base-200"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered sm:w-96  bg-base-200"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="relative">
              <input
                type={isShowingPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered sm:w-96  bg-base-200"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                onClick={() => {
                  setIsShowingPassword(!isShowingPassword);
                }}
                className="absolute right-4 cursor-pointer p-4 top-1/2 -translate-y-1/2"
              >
                {isShowingPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {error && (
              <p className="text-red-500 font-bold mt-4  w-full text-center text-balance p-4 rounded-lg">
                {error}
              </p>
            )}
            <button className="btn-hover btn btn-primary text-white border-none  sm:w-96 w-full py-2 px-4 mt-4">
              Register
            </button>
            <p>Or connect with social media</p>
            <Link
              target="_blank"
              to="https://www.google.com/"
              className="btn bg-red-800 text-white  sm:w-96 w-full py-2 px-4 mt-4 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.3 0 6.2 1.2 8.4 3.1l6.3-6.3C34.5 2.4 29.6 0 24 0 14.5 0 6.6 5.6 2.7 13.7l7.4 5.7C11.8 13 17.5 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.5c0-1.7-.1-3.3-.4-4.8H24v9.3h12.5c-.5 2.6-2 4.8-4.1 6.3l7.4 5.7C43.1 36.1 46.1 30.8 46.1 24.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.1 28.8c-.8-2.6-.8-5.3 0-7.8L2.7 13.7C0.9 17.2 0 21 0 24.8c0 3.8.9 7.5 2.7 10.9l7.4-5.7z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.4 0 11.8-2.1 15.7-5.7l-7.4-5.7c-2.2 1.5-5 2.4-8.3 2.4-6.5 0-12.2-3.5-15-8.6l-7.4 5.7C6.6 42.4 14.5 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              Sign in with Google
            </Link>
            <Link
              target="_blank"
              to="https://www.facebook.com/"
              className="btn bg-blue-600 text-white  sm:w-96 w-full py-2 px-4 mt-4 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="M22.675 0h-21.35c-0.732 0-1.325 0.594-1.325 1.326v21.348c0 0.731 0.593 1.326 1.325 1.326h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.096 1.894-4.787 4.659-4.787 1.325 0 2.463 0.099 2.795 0.144v3.24h-1.918c-1.504 0-1.794 0.715-1.794 1.764v2.31h3.587l-0.467 3.622h-3.12v9.294h6.116c0.732 0 1.325-0.595 1.325-1.326v-21.348c0-0.732-0.593-1.326-1.325-1.326z"
                />
              </svg>
              Sign in with Facebook
            </Link>
            <p className="text-center">
              Already have an account ?
              <a className="font-bold text-primary" href="/login">
                {" "}
                Login
              </a>
            </p>
          </form>
        </div>
        <img
          src="/images/Signup.svg"
          alt="Signup Illustration"
          className=" w-1/2  hidden lg:block"
        />
      </motion.div>
    </>
  );
};

export default SignUp;
