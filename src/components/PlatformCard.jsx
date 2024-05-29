import React from "react";

const PlatformCard = ({ platformName, Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-64 h-48 p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-color cursor-pointer flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
      {/* {Icon && (
        <>
          <Icon className="absolute z-10 -top-14 -right-14 text-8xl text-primary group-hover:text-white group-hover:rotate-12 transition-transform duration-300" />
          <Icon className="mb-2 text-3xl text-primary group-hover:text-white transition-colors relative z-10 duration-300" />
        </>
      )} */}
      <h3 className="font-medium text-xl text-slate-950 group-hover:text-white relative z-10 duration-300">
        {platformName}
      </h3>
      {/* <div className="btn mt-2 relative z-10 duration-300 group-hover:text-white">
        Details
      </div> */}
    </div>
  );
};

export default PlatformCard;
