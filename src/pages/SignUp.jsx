import { useState } from "react";
import { motion } from "framer-motion";
const SignUp = () => {
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
    alert("Registered successfully!");
    setFormData({
      email: "",
      password: "",
    });
    console.log("Form data:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "-10%" }}
      animate={{ opacity: 1, y: "0" }}
      transition={{ duration: 0.8 }}
      className="flex m-24"
    >
      <div className="flex flex-col sm:py-36 py-24 sm:px-52 px-4 w-full sm:w-[50%] items-center">
        <h1 className="text-5xl font-bold mb-12">SignUp</h1>
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
          <button className="btn-hover btn btn-primary text-white border-none rounded-3xl sm:w-96 w-full py-2 px-4 mt-4">
            Register
          </button>
          <p>Or connect with social media</p>
          <button className="btn bg-red-800 text-white rounded-3xl sm:w-96 w-full py-2 px-4 mt-4 flex items-center justify-center">
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
          </button>
          <button className="btn bg-blue-600 text-white rounded-3xl sm:w-96 w-full py-2 px-4 mt-4 flex items-center justify-center">
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
          </button>
          <p className="text-center">
            Already have an account ?
            <a className="font-bold text-primary" href="/login">
              {" "}
              Login
            </a>
          </p>
        </form>
      </div>
      <div className="bg-themed w-[50%] sm:flex justify-center pt-80 pb-48 hidden md:px-16">
        <div>
          <h1 className="text-5xl font-bold text-center pb-8">
            Hi <span className="text-primary">User</span>,
          </h1>
          <h1 className="text-5xl font-bold text-center">
            Welcome to the world of sharing!
          </h1>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
