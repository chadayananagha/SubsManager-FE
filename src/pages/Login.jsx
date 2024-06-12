import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location.state?.from || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // console.log(token);
  // const localAPI = "http://localhost:8080";
  // const deployedAPI = "https://subsmanager-be.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://subsmanager-be.onrender.com/users/login",
        // `${localAPI}/users/login`,
        { email: formData.email, password: formData.password }
      );
      const data = response.data;
      // console.log(data);
      setIsLoading(false);
      login(data.token, data.userId);
      toast.success("Successfully logged in!", {
        duration: 1000,
        className: "bg-base-100 toast-style",
      });

      setTimeout(() => {
        navigate(previousPage);
      }, 1000);
    } catch (error) {
      setIsLoading(false); // Ensure loading is set to false in case of error
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        toast.error(error.response.data.error, {
          duration: 1000,
          className: "bg-base-100 toast-style",
        });
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Login error:", error);
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
        <img
          src="/images/login.svg"
          alt="Login illustration"
          className=" hover:grayscale-0 w-1/2 transition duration-500 hidden lg:block"
        />
        <div className="flex flex-col sm:py-36 py-24 sm:px-52 px-4 w-full sm:w-[50%] items-center">
          <h1 className="text-5xl font-bold mb-12">Login</h1>
          <form
            className="flex flex-col items-center gap-8"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered sm:w-96 bg-base-200"
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
            <button
              type="submit"
              className="btn-hover border-none btn btn-primary text-white  sm:w-96 w-full py-2 px-4 mt-4"
            >
              Login
            </button>

            <a href="#" className="text-primary font-bold">
              Forgot password?
            </a>
            <p className="mt-16 text-center">
              Don't have an account?
              <a className="font-bold text-primary" href="/signup">
                {" "}
                SignUp
              </a>
            </p>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
