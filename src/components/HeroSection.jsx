import React from "react";

const HeroSection = () => {
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
              <button className="btn btn-color text-black text-2xl px-10 rounded-3xl flex justify-center items-center">
                Login
              </button>
              <button className="btn btn-primary text-white text-2xl px-10 rounded-3xl">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
