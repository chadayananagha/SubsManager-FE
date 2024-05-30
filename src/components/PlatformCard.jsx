import React from "react";

const PlatformCard = ({ platformName, Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-48 h-36 p-4 rounded border border-slate-300 relative overflow-hidden group bg-color cursor-pointer flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 transition-colors duration-300">
        {platformName}
      </h3>
    </div>
  );
};

export default PlatformCard;
