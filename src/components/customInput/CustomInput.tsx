import React from "react";
import { InputFieldProps } from "@/types/types";
const CustomInput: React.FC<InputFieldProps> = ({
  type,
  value,
  placeholder,
  width = "900px",
  onChange,
}) => {
  return (
    <input
      value={value ?? ""}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`${width} px-4 py-3 rounded-[48px] bg-[#181E29] border-[#353C4A] border-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all`}
    />
  );
};

export default CustomInput;
