import { useJwt } from "react-jwt";
import { AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import SearchPageButtons from "../components/SearchPageButtons";
import SearchPageAddForm from "../components/SearchPageAddForm";

const StartSharing = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  // console.log(decodedToken);

  const openForm = () => {
    setIsAdding(!isAdding);
  };

  return (
    <>
      <div className="relative pt-24 bg-base100 flex-1 overflow-clip ">
        <div className="flex flex-col items-center gap-4">
          <h1 className=" text-6xl">
            Welcome{" "}
            <span className="text-primary">{decodedToken?.username}</span>
          </h1>
          <h2 className="text-xl">
            Share a subscription or start searching for one
          </h2>
        </div>
        <SearchPageButtons openForm={openForm} />{" "}
        <img
          src="/images/undraw_share_link_re_54rx.svg"
          alt="sharingImage"
          className="grayscale opacity-20 absolute -right-20 -bottom-32 "
        />
      </div>
      <AnimatePresence>
        {isAdding && <SearchPageAddForm openForm={openForm} />}
      </AnimatePresence>
    </>
  );
};

export default StartSharing;
