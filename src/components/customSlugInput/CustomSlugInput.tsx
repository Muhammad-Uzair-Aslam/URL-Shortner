'use client'
import { Link } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../button/Button'
import { FaArrowRight } from 'react-icons/fa6'
export type CustomSlugInputProp={
    placeholder:string,
    title:string,
    clickHandler?:()=>void,
}
export default function CustomSlugInput({placeholder,title,clickHandler}:CustomSlugInputProp) {
    const [customSlug,setCustomSlug]=useState('')
  return (
<div className="bg-[#1A1F2E] rounded-[30px] p-1 flex border-2 border-[#353C4A] w-[100%]">
            <div className="flex items-center bg-transparent px-4 py-2 flex-1">
              <Link className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder={placeholder}
                className="w-full bg-transparent border-none focus:outline-none text-white"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
              />
            </div>
            <div className='hidden md:block'>
            <Button title={title} clickHandler={clickHandler}/>
            </div>
            <div className='block md:hidden'>
            <button className="w-[50]  bg-[#0066FF] text-white py-3 rounded-[25px] hover:bg-[#0052CC] transition-all duration-200 font-medium" onClick={clickHandler}>
            <div className='flex justify-center'>
            <FaArrowRight size={25} color='white' />

            </div>
            
          </button>
            </div>
          </div>  )
}
