import React from 'react'

export default function AutoPasteClipboard() {
  return (
        <div className="relative z-10 flex justify-center my-4">
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800 border border-gray-700">
                <input type="checkbox" className="sr-only peer" />
                <span className="absolute inset-y-1 left-1 w-4 h-4 rounded-full bg-gray-600 peer-checked:bg-[#144EE3] peer-checked:left-7 transition-all duration-200"></span>
              </div>
              Auto Paste to Clipboard
            </label>
          </div>  )
}
