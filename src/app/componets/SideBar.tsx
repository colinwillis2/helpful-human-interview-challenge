import React from 'react'

const categories = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Gray'];

export default function SideBar() {
  return (
    <aside className="w-48 bg-gray-400 p-4 space-y-4 min-h-screen">
        <button className="w-full border border-black py-2 rounded hover:bg-gray-200 transition bg-white text-black">
            Random Color
        </button>
        <ul className="space-y-2">
            {categories.map((color) => (
                <li key={color} className="hover:underline cursor-pointer">
                    {color}
                </li>
            ))}
        </ul>
    </aside>
  )
}
