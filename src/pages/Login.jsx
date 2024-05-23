import { useState } from "react";
import { motion } from "framer-motion";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      email: "",
      password: "",
    });
    alert("Logged in successfully!");
    console.log("Form data:", formData);
  };

  return (
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
          <button className="btn-hover border-none btn btn-primary text-white rounded-3xl sm:w-96 w-full py-2 px-4 mt-4">
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
  );
};

export default Login;
