import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import ThemeToggler from "./ThemeToggler";
import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useJwt } from "react-jwt";
const Sidebar = ({ isSidebarOpen, handleSidebar }) => {
  const navigate = useNavigate();
  const { token, logout, profilePic } = useContext(AuthContext);
  //*Decode the Token
  const { decodedToken } = useJwt(token);
  const username = decodedToken?.username;

  const sidebarRef = useRef(null);

  //*logout Function
  const handleLogout = () => {
    logout();
    handleSidebar();
    navigate("/");
    toast.success("Successfully logged out!", {
      duration: 1000,
      className: "bg-base-100 toast-style",
    });
  };
  //*clicking outside of the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        handleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleSidebar, sidebarRef, isSidebarOpen]);
  // console.log(profilePic);

  return (
    <div
      ref={sidebarRef}
      className={`fixed  right-0 top-0 bottom-0  h-dvh bg-base-100 transition-[width] duration-800 flex flex-col no-wrap justify-center items-center overflow-hidden ${
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
        <div className="flex flex-col gap-4 absolute h-full top-1/4  items-center ">
          <div className="flex justify-center items-center self-start -mt-24 ">
            <p className="text-2xl text-center text-balance">
              Welcome{" "}
              <span className="font-extrabold tracking-wider text-primary text-2xl ">
                {username}
              </span>
            </p>
          </div>

          {profilePic ? (
            <div className="avatar hidden md:block  ">
              <div className="w-16 rounded-full">
                <img src={profilePic} />
              </div>
            </div>
          ) : (
            <div className="bg-zinc-300 hidden md:block s border border-zinc-200 text-neutral-content rounded-full w-16 overflow-hidden ">
              <span className="text-6xl  text-base-100 mt-2">
                <FaUser />
              </span>
            </div>
          )}
          <div className="flex flex-col gap-4 lg:mt-4  justify-center items-center ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "activeSideBarNav" : "sideBarNav"
              }
              onClick={() => handleSidebar()}
              to="/profile"
            >
              <p className="p-4">Edit Profile</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "activeSideBarNav" : "sideBarNav"
              }
              onClick={() => handleSidebar()}
              to="/messenger"
            >
              <p className="p-4">Messenger</p>
            </NavLink>
            <NavLink
              onClick={() => handleSidebar()}
              to="/subsmanager"
              className={({ isActive }) =>
                isActive ? "activeSideBarNav" : "sideBarNav"
              }
            >
              <p className="p-4">Manage Subscriptions</p>
            </NavLink>
            <NavLink
              onClick={() => handleSidebar()}
              to="/search"
              className={({ isActive }) =>
                isActive ? "activeSideBarNav" : "sideBarNav"
              }
            >
              <p className="p-4">Search for subscriptions</p>
            </NavLink>
            <button
              onClick={handleLogout}
              className="z-10 btn bg-red-600 hover:bg-red-700 px-16 text-lg text-base-100 mt-24"
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 absolute top-1/4 justify-center items-center ">
          <div className="flex gap-8 justify-center items-center">
            <Link onClick={handleSidebar} to="/login">
              <button className="btn btn-color text-black text-2xl px-4 ">
                Login
              </button>
            </Link>
            <Link onClick={handleSidebar} to="/signup">
              <button className="btn btn-primary text-white text-2xl px-4 ">
                Sign up
              </button>
            </Link>
          </div>
          <NavLink
            onClick={handleSidebar}
            className={({ isActive }) =>
              isActive ? "activeSideBarNav" : "sideBarNav"
            }
            to="/search "
          >
            <p className="p-4">Search for subscriptions</p>
          </NavLink>
          <NavLink
            onClick={handleSidebar}
            className={({ isActive }) =>
              isActive ? "activeSideBarNav" : "sideBarNav"
            }
            to="/contact"
          >
            {" "}
            <p className="p-4">Contact</p>
          </NavLink>
          <NavLink
            onClick={handleSidebar}
            className={({ isActive }) =>
              isActive ? "activeSideBarNav" : "sideBarNav"
            }
            to="/faq"
          >
            {" "}
            <p className="p-4">FAQ</p>
          </NavLink>
          <NavLink
            onClick={handleSidebar}
            className={({ isActive }) =>
              isActive ? "activeSideBarNav" : "sideBarNav"
            }
            to="/about"
          >
            {" "}
            <p className="p-4">About</p>
          </NavLink>
        </div>
      )}
      <img
        className="grayscale opacity-40 absolute -bottom-24 h-1/3"
        src="/images/Side3.png"
        alt="Sidebar illustration"
      />
    </div>
  );
};

export default Sidebar;
