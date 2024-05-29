import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, logout } = authContext;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
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
        "https://subsmanager-be.onrender.com/users/login",
        { email: formData.email, password: formData.password }
      );
      const data = response.data;
      console.log(data);

      localStorage.setItem("token", data.token);
      // localStorage.setItem('userId', data.userId)
      setIsLoading(false);
      login(data.token);
      toast.success("Successfully logged in!");
      //*After .6s second navigate to desired path
      setTimeout(() => {
        navigate("/");
      }, 600);
      // alert("Logged in successfully!");
    } catch (error) {
      setIsLoading(false); // Ensure loading is set to false in case of error
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        toast.error(error.response.data.error, { duration: 1000 });
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={`${
          isLoading
            ? "pt-24 h-screen flex justify-center items-center bg-base-200/50 absolute w-screen z-20"
            : "hidden"
        }`}
      >
        <Loading />
      </div>
      <motion.div
        initial={{ opacity: 0, y: "-10%" }}
        animate={{ opacity: 1, y: "0" }}
        transition={{ duration: 0.8 }}
        className="flex m-24"
      >
        <div className="bg-themed w-[50%] sm:flex justify-center pt-56 pb-48 hidden md:px-16 ">
          <div>
            <h1 className="text-5xl font-bold text-center pb-8">
              Hi <span className="text-primary">User!</span>
            </h1>
            <h1 className="text-5xl font-bold text-center text-balance ">
              Welcome to the world of sharing!
            </h1>
          </div>
        </div>
        <div className="flex flex-col sm:py-36 py-24 sm:px-52 px-4 w-full sm:w-[50%] items-center">
          <h1 className="text-5xl font-bold mb-12">Login</h1>
          <form
            className="flex flex-col items-center gap-8"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered sm:w-96 rounded-3xl bg-base-200"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered sm:w-96 rounded-3xl bg-base-200"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <button
              type="submit"
              className="btn-hover border-none btn btn-primary text-white rounded-3xl sm:w-96 w-full py-2 px-4 mt-4"
            >
              Login
            </button>
            <button
              onClick={logout}
              type="submit"
              className="btn-hover border-none btn btn-primary text-white rounded-3xl sm:w-96 w-full py-2 px-4 mt-4"
            >
              Logout
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
    </div>
  );
};

export default Login;
