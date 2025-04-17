'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const categories = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Gray'];

export default function SideBar() {
  const router = useRouter();

  const handleRandomColor = async () => {
    try {
      const response = await fetch('/api/get_random_color');
      const color = await response.json();
      
      if (color) {
        router.push(`/color/${color.slug}`);
      }
    } catch (error) {
      console.error('Failed to fetch random color:', error);
    }
  };

  return (
    <aside className="w-48 bg-gray-400 p-4 space-y-4 min-h-screen">
        <button 
          onClick={handleRandomColor}
          className="w-full border border-black py-2 rounded hover:bg-gray-200 transition bg-white text-black">
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
