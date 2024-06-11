import { useState, useEffect, useContext } from "react";
import ThemeToggler from "./ThemeToggler";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useJwt } from "react-jwt";
const NavBar = () => {
  //*context
  const authContext = useContext(AuthContext);
  const { token, profilePic } = authContext;
  const { decodedToken } = useJwt(token);
  // console.log(decodedToken);

  //*Change burgerMenu on hover
  const [isHovered, setIsHovered] = useState(false);

  //*SideBar State
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  //*Set the state for the scrolling
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //*Open and close sidebar
  const handleSidebar = () => {
    setIsSideBarOpen((prev) => !prev);
    if (!isSidebarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50  w-full p-4 flex justify-between items-center transition-all duration-500 ${
        isScrolling ? "  drop-shadow-xl bg-base-100 " : "bg-transparent"
      }`}
    >
      <Link className="md:ml-24 " to="/">
        LOGO
      </Link>

      {/* //!Hamburger Menu  */}
      <button
        className="lg:hidden"
        onClick={handleSidebar}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FiArrowRightCircle
          className={` absolute text-3xl transition-all duration-1000 ${
            !isHovered ? "opacity-0" : "opacity-1000"
          }`}
        />

        <FiMenu
          className={` text-3xl transition-all duration-1000 ${
            isHovered ? "opacity-0" : "opacity-1000"
          }`}
        />
      </button>
      <div className="hidden lg:flex justify-end gap-6 mr-16 flex-1">
        <ThemeToggler />
        <Link
          to="/startsharing"
          className=" relative text-nowrap btn bg-[#FF5733]  hover:bg-[#CC4629]  justify-center items-center overflow-hidden group px-8 "
        >
          <span className="   py-4 flex justify-center items-center opacity-100 group-hover:opacity-0 group-hover:-translate-y-full transition-all duration-1000 text-base-100">
            Start sharing
          </span>
          <span className=" py-4 absolute  opacity-0  group-hover:opacity-100  group-hover:flex group-hover:justify-center group-hover:items-center  translate-y-full  group-hover:translate-y-0  transition-all duration-1000  text-base-100">
            Right now
          </span>
        </Link>
        {/* <Link
          to="/startsharing"
          className=" relative text-nowrap btn btn-primary  justify-center items-center overflow-hidden group px-8 "
        >
          <span className="   py-4 flex justify-center items-center opacity-100 group-hover:opacity-0 group-hover:-translate-y-full transition-all duration-1000">
            Start sharing
          </span>
          <span className=" py-4 absolute  opacity-0  group-hover:opacity-100  group-hover:flex group-hover:justify-center group-hover:items-center  translate-y-full  group-hover:translate-y-0  transition-all duration-1000 ">
            Right now
          </span>
        </Link> */}
      </div>
      {token ? (
        profilePic ? (
          <div
            onClick={handleSidebar}
            className="avatar hidden lg:block cursor-pointer"
          >
            <div className="w-12 rounded-full">
              <img src={profilePic} />
            </div>
          </div>
        ) : (
          <div
            onClick={handleSidebar}
            className="avatar placeholder hidden lg:block cursor-pointer"
          >
            <div className="bg-zinc-300 border border-zinc-200 text-neutral-content rounded-full w-12 overflow-hidden ">
              <span className="text-4xl  text-base-100 mt-2">
                <FaUser />
              </span>
            </div>
          </div>
        )
      ) : null}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSideBarOpe={setIsSideBarOpen}
        handleSidebar={handleSidebar}
      />
    </div>
  );
};

export default NavBar;
