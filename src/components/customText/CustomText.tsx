import React from "react";
import { CustomTextProps } from "@/types/types";
export default function CustomText({ title, description }: CustomTextProps) {
  return (
    <div>
      <h2 className="text-4xl lg:text-[50px] font-bold text-center  bg-custom-gradient text-transparent bg-clip-text leading-[1.2]  tracking-normal">
        {title}{" "}
      </h2>

      <p className="text-gray-400 text-center mx-auto max-w-[560px] my-5">
        {description}
      </p>
    </div>
  );
}
