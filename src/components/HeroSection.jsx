import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HeroSection = () => {
  const { token } = useContext(AuthContext);
  return (
    <div>
      <div className="hero min-h-screen bg-base">
        <div className="hero-content flex-col lg:flex-row-reverse bg-base">
          <img
            className="max-w-sm rounded-lg mix-blend-multiply lg:ml-8"
            src="./src/assets/heroPic.png"
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
            <div className="flex gap-6 justify-center">
              {token ? (
                <button
                  to="/login"
                  className=" relative text-nowrap btn btn-primary   justify-center items-center overflow-hidden group px-8"
                >
                  <span className="   py-4 flex justify-center items-center opacity-100 group-hover:opacity-0 group-hover:-translate-y-full transition-all duration-1000">
                    Start sharing
                  </span>
                  <span className=" py-4 absolute  opacity-0  group-hover:opacity-100  group-hover:flex group-hover:justify-center group-hover:items-center  translate-y-full  group-hover:translate-y-0  transition-all duration-1000 ">
                    Right now
                  </span>
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn btn-color text-black text-2xl px-10 rounded-3xl flex justify-center items-center">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn btn-primary text-white text-2xl px-10 rounded-3xl">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
