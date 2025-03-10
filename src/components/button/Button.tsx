import React from "react";

export type ButtonProps = {
  title: string;
  clickHandler?: () => void;
  Type?:"button" | "submit" | "reset"
};

export const Button: React.FC<ButtonProps> = ({ Type,title, clickHandler }) => {
  return (
    <button
      className="w-[160px] bg-[#0066FF] text-white py-3 rounded-[25px] hover:bg-[#0052CC] transition-all duration-200 font-medium"
      onClick={clickHandler}
      type={Type}
    >
      {title}
    </button>
  );
};
