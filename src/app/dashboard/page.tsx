'use client'
// pages/dashboard.js
import { useState } from 'react';
import { Link,Copy, Twitter, Youtube, Chrome, Image } from 'lucide-react';
// import Link from 'next/link';
export default function Dashboard() {
  const [inputUrl, setInputUrl] = useState('');
  
  const demoData = [
    {
      shortLink: 'https://linkly.com/Rx43cQmg',
      originalLink: 'https://www.twitter.com/tweets/NewGuDhal',
      platform: 'Twitter',
      clicks: '1313',
      status: 'Active',
      date: 'Oct - 10 2023'
    },
    {
      shortLink: 'https://linkly.com/Bx43cQmg',
      originalLink: 'https://www.youtube.com/watch?v=BJ72HmHOUA',
      platform: 'Youtube',
      clicks: '4513',
      status: 'Inactive',
      date: 'Oct - 06 2023'
    },
    {
      shortLink: 'https://linkly.com/Ax43cQmg',
      originalLink: 'https://www.adobe.com/sensei/services.com/',
      platform: 'Chrome',
      clicks: '1813',
      status: 'Active',
      date: 'Oct - 01 2023'
    },
    {
      shortLink: 'https://linkly.com/Bx43cQmg',
      originalLink: 'https://vimeo.com/823257654',
      platform: 'Vimeo',
      clicks: '1313',
      status: 'Active',
      date: 'Sep - 20 2023'
    },
    {
      shortLink: 'https://linkly.com/Px43cQmg',
      originalLink: 'https://unsplash.com/photos/2K8HwDzFWG',
      platform: 'Image',
      clicks: '1423',
      status: 'Active',
      date: 'Sep - 18 2023'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0" 
        style={{
          background: `
            repeating-radial-gradient(
              circle at 50% 50%,
              transparent 0px,
              transparent 199px,
              rgba(51, 51, 51, 0.1) 200px,
              transparent 201px,
              transparent 400px
            ),
            repeating-radial-gradient(
              circle at 50% 50%,
              transparent 0px,
              transparent 299px,
              rgba(51, 51, 51, 0.07) 300px,
              transparent 301px,
              transparent 600px
            )
          `,
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 90%)'
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Linkly
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 text-gray-300 hover:text-white"> Login → </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">Register Now</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 via-pink-500 to-blue-600 bg-clip-text text-transparent">
              Shorten Your Loooong Links :)
            </span>
          </h2>
          <p className="text-gray-400">
            Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.
          </p>
        </div>

        {/* URL Input */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-gray-800/50 rounded-lg p-1 flex">
            <div className="flex-1 flex items-center bg-transparent px-4">
              <Link className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Enter the link here"
                className="w-full bg-transparent border-none focus:outline-none text-white"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
            </div>
            <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Shorten Now!
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
            <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
            <span>Auto Paste from Clipboard</span>
          </div>
          <div className="text-sm text-gray-400 mt-4">
            You can create <span className="text-pink-500">05</span> more links. <span className="text-blue-500">Register Now</span> to enjoy Unlimited usage <span className="text-gray-500">ⓘ</span>
          </div>
        </div>

        {/* Links Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-left">
                <th className="p-4">Short Link</th>
                <th className="p-4">Original Link</th>
                <th className="p-4">QR Code</th>
                <th className="p-4">Clicks</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {demoData.map((item, index) => (
                <tr key={index} className="border-t border-gray-800">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {item.shortLink}
                      <Copy size={16} className="text-gray-400 cursor-pointer hover:text-white" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {item.platform === 'Twitter' && <Twitter className="text-blue-400" size={20} />}
                      {item.platform === 'Youtube' && <Youtube className="text-red-500" size={20} />}
                      {item.platform === 'Chrome' && <Chrome className="text-blue-500" size={20} />}
                      {item.platform === 'Image' && <Image className="text-purple-500" size={20} />}
                      <span className="truncate max-w-xs">{item.originalLink}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <div className="w-6 h-6 bg-black" />
                    </div>
                  </td>
                  <td className="p-4">{item.clicks}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded ${
                      item.status === 'Active' ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}