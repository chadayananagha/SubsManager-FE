import { IoMdClose } from "react-icons/io";
import ThemeToggler from "./ThemeToggler";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Sidebar = ({ isSidebarOpen, handleSidebar }) => {
  const { token } = useContext(AuthContext);
  return (
    <div
      className={`fixed  right-0 top-0 bottom-0  h-screen bg-base-100 transition-[width] duration-800 flex flex-col no-wrap justify-center items-center overflow-hidden ${
        isSidebarOpen
          ? "w-2/3 lg:w-1/4 shadow-[0_0_0_10000px_rgba(0,0,0,.40)]  "
          : "w-0 "
      }`}
    >
      <div className="absolute top-0 flex items-center justify-between lg:justify-end w-full px-4 py-8">
        <div className="lg:hidden">
          <ThemeToggler />
        </div>

        <button
          onClick={handleSidebar}
          className={`text-4xl hover:rotate-180 hover:scale-120 hover:bg-base-300 transition-all duration-500 rounded-lg `}
        >
          <IoMdClose />
        </button>
      </div>
      {token ? (
        <div className="flex flex-col gap-8 absolute top-1/4">
          <button className="btn">View Profile</button>
          <Link
            onClick={handleSidebar}
            to="/login"
            className=" relative text-nowrap btn btn-primary   justify-center items-center overflow-hidden group px-8"
          >
            <span className="   py-4 flex justify-center items-center opacity-100 group-hover:opacity-0 group-hover:-translate-y-full transition-all duration-1000">
              Start sharing
            </span>
            <span className=" py-4 absolute  opacity-0  group-hover:opacity-100  group-hover:flex group-hover:justify-center group-hover:items-center  translate-y-full  group-hover:translate-y-0  transition-all duration-1000 ">
              Right now
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8 absolute top-1/4">
          <button className="btn">Contact</button>
          <button className="btn">FAQ</button>
          <Link
            onClick={handleSidebar}
            to="/login"
            className=" relative text-nowrap btn btn-primary   justify-center items-center overflow-hidden group px-8"
          >
            <span className="   py-4 flex justify-center items-center opacity-100 group-hover:opacity-0 group-hover:-translate-y-full transition-all duration-1000">
              Start sharing
            </span>
            <span className=" py-4 absolute  opacity-0  group-hover:opacity-100  group-hover:flex group-hover:justify-center group-hover:items-center  translate-y-full  group-hover:translate-y-0  transition-all duration-1000 ">
              Right now
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
