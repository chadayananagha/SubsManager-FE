import { IoMdClose } from "react-icons/io";
import ThemeToggler from "./ThemeToggler";
import { Link } from "react-router-dom";
const Sidebar = ({ isSidebarOpen, handleSidebar }) => {
  return (
    <div
      className={`fixed right-0 top-0 bottom-0  h-screen bg-base-100 transition-[width] duration-800 lg:hidden flex no-wrap justify-center items-center overflow-hidden ${
        isSidebarOpen
          ? "w-2/3 shadow-[0_0_0_10000px_rgba(0,0,0,.40)]  "
          : "w-0 "
      }`}
    >
      <div className=" absolute top-0 flex items-center justify-between w-full px-4 py-8">
        <ThemeToggler />

        <button
          onClick={handleSidebar}
          className={`  text-4xl hover:rotate-180 hover:scale-120 hover:bg-base-300 transition-all duration-500 rounded-lg `}
        >
          <IoMdClose />
        </button>
      </div>

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
  );
};

export default Sidebar;
