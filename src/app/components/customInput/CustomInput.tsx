import React from "react";
interface InputFieldProps {
    type: string;
    placeholder: string;
    width?: string;
  }

const CustomInput: React.FC<InputFieldProps> = ({ type, placeholder, width = "900px" }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`${width} px-4 py-2 rounded-[48]  bg-[#181E29]/50  border-[#353C4A] border-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all`}
      />
    );
  };
  export default CustomInput;