import React from "react";

const CategoryCard = ({ title, subtitle, Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-base-200 cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
      {Icon && (
        <>
          {/* <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-primary group-hover:text-white group-hover:rotate-12 transition-transform duration-300" /> */}
          <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-primary hidden sm:inline group-hover:text-white group-hover:rotate-12 transition-transform duration-300" />

          <Icon className="mb-2 text-2xl text-primary group-hover:text-white transition-colors relative z-10 duration-300" />
        </>
      )}
      <h3 className="font-medium text-lg group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      {/* <p className="text-slate-400 group-hover:text-white relative z-10 duration-300">
        {subtitle}
      </p> */}
    </div>
  );
};

export default CategoryCard;
