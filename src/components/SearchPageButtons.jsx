import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";
import { DiAptana } from "react-icons/di";

const SearchPageButtons = ({ openForm }) => {
  const { token } = useContext(AuthContext);
  return token ? (
    <div className="flex flex-col sm:grid-cols-2 sm:grid items-center justify-center gap-8 sm:gap-16 mt-8 sm:mt-24 mx-12 ">
      <motion.div
        onClick={openForm}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="justify-self-end z-10 "
      >
        <div className="justify-self-end w-40 py-4  bg-primary rounded-lg text-center cursor-pointer relative group overflow-hidden hover:scale-110 transition-transform duration-500">
          <p className="relative z-10 font-bold text-primary-content ">Add </p>
          <IoMdAddCircle className="absolute text-primary-content -bottom-6 -right-6 text-6xl z-0  group-hover:-translate-x-[250%] group-hover:-translate-y-2/4 group-hover:rotate-180 transition-all duration-500" />
        </div>
      </motion.div>
      <motion.div
        to="/search"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10"
      >
        <Link to="/search">
          <div className="w-40  py-4 bg-primary rounded-lg text-center cursor-pointer relative group overflow-hidden hover:scale-110 transition-transform duration-500">
            <p className="relative z-10 font-bold text-primary-content  ">
              Search
            </p>
            <CiSearch className="absolute text-primary-content -bottom-3  -right-3 text-6xl z-0  group-hover:-translate-x-[200%] group-hover:-translate-y-1/4  group-hover:rotate-180  transition-all duration-500" />
          </div>
        </Link>
      </motion.div>
      <motion.div
        to="/search"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="col-span-2 justify-self-center z-10"
      >
        <Link to="/subsmanager">
          <div className="w-60 sm:w-80 py-4  bg-primary rounded-lg text-center cursor-pointer relative group overflow-hidden hover:scale-110 transition-transform duration-500 my-4 ">
            <p className="relative z-10 font-bold text-primary-content  ">
              Manage Subscriptions
            </p>
            <DiAptana className="absolute text-primary-content -bottom-3  -right-3 text-6xl z-0  group-hover:-translate-x-[350%] sm:group-hover:-translate-x-[480%] group-hover:-translate-y-1/4  group-hover:rotate-180  transition-all duration-500" />
          </div>
        </Link>
      </motion.div>
    </div>
  ) : (
    <div className="flex flex-wrap items-center justify-center gap-24 mt-8 sm:mt-24 mx-12">
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 "
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
        className="z-10"
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
