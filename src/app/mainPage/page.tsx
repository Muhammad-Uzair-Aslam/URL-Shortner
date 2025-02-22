// 'use client'
// // pages/dashboard.js
// import { useState } from 'react';
// import { Link, History, BarChart2, Settings, Filter, Edit2, Copy, Bell } from 'lucide-react';

// export default function Dashboard() {
//   const demoData = [
//     {
//       shortLink: 'https://linkly.com/Rx43cQmg',
//       originalLink: 'https://www.twitter.com/tweets/NewsDhGu',
//       platform: 'Twitter',
//       clicks: '1313',
//       status: 'Active',
//       date: 'Oct - 10 2023'
//     },
//     {
//       shortLink: 'https://linkly.com/Bx43cQmg',
//       originalLink: 'https://www.youtube.com/watch?v=8J72HmH6UA',
//       platform: 'Youtube',
//       clicks: '4313',
//       status: 'Inactive',
//       date: 'Oct - 08 2023'
//     },
//     {
//       shortLink: 'https://linkly.com/Ax43cQmg',
//       originalLink: 'https://www.advertisementsmarket.com/',
//       platform: 'Chrome',
//       clicks: '1013',
//       status: 'Active',
//       date: 'Oct - 01 2023'
//     }
//     // Add more items as needed
//   ];

//   return (
//     <div className="min-h-screen bg-[#0B0F19] text-white">
//       {/* Background Pattern */}
//       <div 
//         className="fixed inset-0" 
//         style={{
//           background: `
//             repeating-radial-gradient(
//               circle at 50% 50%,
//               transparent 0px,
//               transparent 199px,
//               rgba(51, 51, 51, 0.1) 200px,
//               transparent 201px,
//               transparent 400px
//             ),
//             repeating-radial-gradient(
//               circle at 50% 50%,
//               transparent 0px,
//               transparent 299px,
//               rgba(51, 51, 51, 0.07) 300px,
//               transparent 301px,
//               transparent 600px
//             )
//           `,
//           maskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 90%)'
//         }}
//       />

//       {/* Top Navigation */}
//       <nav className="relative z-10 flex justify-between items-center p-4 border-b border-gray-800">
//         <div className="flex items-center gap-8">
//           <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
//             Linkly
//           </h1>
//           <div className="flex-1 flex items-center bg-[#1A1F2E] rounded-lg px-2 py-1.5 w-[400px]">
//             <Link className="text-gray-400 mr-2" size={18} />
//             <input
//               type="text"
//               placeholder="Enter the link here"
//               className="w-full bg-transparent border-none focus:outline-none text-white text-sm"
//             />
//             <button className="px-4 py-1.5 bg-blue-600 rounded-lg text-sm hover:bg-blue-700">
//               Shorten Now!
//             </button>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <button className="p-2 bg-[#1A1F2E] rounded-lg relative">
//             <Bell size={20} />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
//           </button>
//           <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1F2E] rounded-lg">
//             <span>Mohammed</span>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M6 9l6 6 6-6" />
//             </svg>
//           </div>
//         </div>
//       </nav>

//       {/* Auto Paste Checkbox */}
//       <div className="relative z-10 flex justify-center mt-2">
//         <label className="flex items-center gap-2 text-sm text-gray-400">
//           <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
//           Auto Paste to Clipboard
//         </label>
//       </div>

//       {/* Tab Navigation */}
//       <div className="relative z-10 flex justify-center gap-8 mt-6 text-sm">
//         <button className="flex items-center gap-2 text-blue-500 border-b-2 border-blue-500 pb-2">
//           <History size={16} />
//           History
//         </button>
//         <button className="flex items-center gap-2 text-gray-400 hover:text-gray-300">
//           <BarChart2 size={16} />
//           Statistics
//         </button>
//         <button className="flex items-center gap-2 text-gray-400 hover:text-gray-300">
//           <Settings size={16} />
//           Settings
//         </button>
//       </div>

//       {/* History Section */}
//       <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg flex items-center gap-2">
//             History <span className="text-sm text-gray-400">(143)</span>
//           </h2>
//           <button className="flex items-center gap-2 text-sm text-gray-400 bg-[#1A1F2E] px-3 py-1.5 rounded-lg">
//             <Filter size={16} />
//             Filter
//           </button>
//         </div>

//         <div className="bg-[#1A1F2E] rounded-lg overflow-hidden">
//           <table className="w-full">
//             <thead>
//               <tr className="text-gray-400 text-left text-sm border-b border-gray-800">
//                 <th className="p-4">Short Link</th>
//                 <th className="p-4">Original Link</th>
//                 <th className="p-4">QR Code</th>
//                 <th className="p-4">Clicks</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Date</th>
//                 <th className="p-4">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm">
//               {demoData.map((item, index) => (
//                 <tr key={index} className="border-b border-gray-800">
//                   <td className="p-4">
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-300">{item.shortLink}</span>
//                       <Copy size={14} className="text-gray-400 cursor-pointer hover:text-white" />
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <div className="flex items-center gap-2 max-w-xs truncate">
//                       {item.platform === 'Twitter' && (
//                         <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
//                           <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
//                             <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
//                           </svg>
//                         </div>
//                       )}
//                       <span className="text-gray-400">{item.originalLink}</span>
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
//                       <div className="w-6 h-6 bg-black" />
//                     </div>
//                   </td>
//                   <td className="p-4 text-gray-300">{item.clicks}</td>
//                   <td className="p-4">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       item.status === 'Active' ? 'text-green-500' : 'text-yellow-500'
//                     }`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="p-4 text-gray-400">{item.date}</td>
//                   <td className="p-4">
//                     <div className="flex gap-2">
//                       <button className="p-1.5 bg-gray-800 rounded-lg hover:bg-gray-700">
//                         <Edit2 size={14} />
//                       </button>
//                       <button className="p-1.5 bg-gray-800 rounded-lg hover:bg-gray-700">
//                         <Copy size={14} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }