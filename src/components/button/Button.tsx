
import React from 'react'
export type buttonProps={
  title:string;
  clickHandler:()=>void
}
export const Button:React.FC<buttonProps>=({title,clickHandler})=>{
  return (
    <button className="w-[160]  bg-[#0066FF] text-white py-3 rounded-[25] hover:bg-[#0052CC] transition-all duration-200 font-medium" onClick={clickHandler}>
            {title}
          </button>
  )
}
