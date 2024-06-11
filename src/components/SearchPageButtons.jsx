import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";

const SearchPageButtons = ({ openForm }) => {
  const { token } = useContext(AuthContext);
  return token ? (
    <div className="flex flex-wrap items-center justify-center gap-24 mt-24 mx-12">
      <motion.div
        onClick={openForm}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-40 py-4  bg-primary rounded-lg text-center cursor-pointer relative group overflow-hidden hover:scale-110 transition-transform duration-500">
          <p className="relative z-10 font-bold text-primary-content ">Add </p>
          <IoMdAddCircle className="absolute text-primary-content -bottom-6 -right-6 text-6xl z-0  group-hover:-translate-x-[250%] group-hover:-translate-y-2/4 group-hover:rotate-180 transition-all duration-500" />
        </div>
      </motion.div>
      <motion.div
        to="/search"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/search">
          <div className="w-40 py-4 bg-primary rounded-lg text-center cursor-pointer relative group overflow-hidden hover:scale-110 transition-transform duration-500">
            <p className="relative z-10 font-bold text-primary-content  ">
              Search
            </p>
            <CiSearch className="absolute text-primary-content -bottom-3  -right-3 text-6xl z-0  group-hover:-translate-x-[200%] group-hover:-translate-y-1/4  group-hover:rotate-180  transition-all duration-500" />
          </div>
        </Link>
      </motion.div>
    </div>
  ) : (
    <div className="flex flex-wrap items-center justify-center gap-24 mt-24 mx-12">
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/login">
          <div className="w-40 py-4 text-primary-content bg-primary rounded-lg text-center cursor-pointer relative group overflow-hidden">
            <p className="relative z-10 font-bold ">Add </p>
            <IoMdAddCircle className="absolute text-primary-content -bottom-6 -right-6 text-6xl z-0  group-hover:-translate-x-[250%] group-hover:-translate-y-2/4 group-hover:rotate-180 transition-all duration-500" />
          </div>
        </Link>
      </motion.div>
      <motion.div
        to="/search"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/search">
          <div className="w-40 py-4 text-primary-content bg-primary rounded-lg text-center cursor-pointer relative group overflow-hidden">
            <p className="relative z-10 font-bold ">Search</p>
            <CiSearch className="absolute  -bottom-3  -right-3 text-6xl z-0  group-hover:-translate-x-[200%] group-hover:-translate-y-1/4  group-hover:rotate-180  transition-all duration-500" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default SearchPageButtons;
