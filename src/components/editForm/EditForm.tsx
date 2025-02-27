'use client'
import React, { useState } from 'react'
import { Button } from '../button/Button'
import CustomSlugInput from '../customSlugInput/CustomSlugInput'
import { Link } from 'lucide-react'

export default function EditForm() {
    const [url,setUrl]=useState('')
  return (
<form className="relative  z-10 max-w-4xl mx-auto px-4 pt-32">
        <div className="space-y-4">
          <div className="bg-[#1A1F2E] border-2 border-[#353C4A] rounded-[30px] p-1 py-2">
            <div className="flex items-center bg-transparent px-4 py-2">
              <Link className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Enter the link to shorten here"
                className="w-full bg-transparent border-none focus:outline-none text-white"
                value={url}
                onChange={(e)=>{setUrl(e.target.value)}}
              />
            </div>
          </div>
          <CustomSlugInput placeholder="Enter Custom Slug" clickHandler={()=>{}} title="Auto Generate"/>
          <div className="flex justify-center pt-4">
            <Button title="Shorten Now!"clickHandler={()=>{}}/>
          </div>
        </div>
      </form>  )
}
