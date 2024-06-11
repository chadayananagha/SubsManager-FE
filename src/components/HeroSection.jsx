import { Link } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useInView, AnimatePresence } from "framer-motion";
import AddMembersButton from "./AddMembersButton";

const HeroSection = () => {
  const { token } = useContext(AuthContext);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });
  const [delayedInView, setDelayedInView] = useState(false);

  useEffect(() => {
    let timer;
    if (isInView) {
      timer = setTimeout(() => {
        setDelayedInView(true);
      }, 1000); // 1 second delay
    }
    return () => clearTimeout(timer);
  }, [isInView]);
  return (
    <>
      <div className="hero min-h-screen bg-hero">
        <div
          ref={heroRef}
          className={`hero-content flex-wrap flex-col lg:flex-row-reverse transition-all duration-1000 ${
            isInView ? "scale-100" : "scale-75"
          } `}
        >
          <img
            className="lg:max-w-sm rounded-lg mix-blend-multiply lg:ml-8 "
            src="/images/heroPic.png"
            alt="Hero Illustration"
          />
          <div className="flex flex-col items-center lg:items-start gap-24">
            <div className="flex flex-col gap-4">
              <h1 className="text-7xl font-bold text-primary text-center lg:text-left">
                Stream smart,
              </h1>
              <h2 className="text-7xl font-bold text-center lg:text-left">
                Share better.
              </h2>
              <p className="text-2xl text-center pt-12 lg:text-left text-balance">
                Combine and manage your subscriptions, simplify life, enjoy
                more!
              </p>
            </div>
            <div
              ref={heroRef}
              className={`flex gap-6 justify-center transition-all duration-1000 ${
                delayedInView ? "opacity-100 " : "opacity-0 translate-x-36 "
              }`}
            >
              {token ? (
                <div>
                  <AnimatePresence>
                    <AddMembersButton />
                  </AnimatePresence>
                  <Link
                    to="/startsharing"
                    className=" relative text-nowrap btn bg-[#FF5733]  hover:bg-[#CC4629] justify-center items-center overflow-hidden group px-32 scale-125 md:ml-12 "
                  >
                    <span className="py-4 flex justify-center items-center opacity-100 group-hover:opacity-0 group-hover:-translate-y-full transition-all duration-1000 text-base-100">
                      Start sharing
                    </span>
                    <span className=" py-4 absolute  opacity-0  group-hover:opacity-100  group-hover:flex group-hover:justify-center group-hover:items-center  translate-y-full  group-hover:translate-y-0  transition-all duration-1000 text-base-100">
                      Right now
                    </span>
                  </Link>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn btn-color text-black text-2xl px-10  flex justify-center items-center">
                      Login
                    </button>
                  </Link>

                  <Link to="/signup">
                    <button className="btn btn-primary text-white text-2xl px-10 ">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
