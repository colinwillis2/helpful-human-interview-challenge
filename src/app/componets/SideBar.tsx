'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const categories = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Gray'];

export default function SideBar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRandomColor = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/get_random_color');
      const colorData = await response.json();
      
      if (colorData) {
        router.push(`/color/${colorData.slug}`);
      }
    } catch (error) {
      console.error('Failed to fetch random color:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleColorPick = async (color: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/get_color?name=${color}`);
      const colorData = await response.json();
  
      if (colorData) {
        router.push(`/color/${colorData.mainColor.slug}`)
      }
    } catch (error) {
      console.error('Failed to fetch color:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="w-48 bg-gray-400 p-4 space-y-4 min-h-screen">
        <button 
          onClick={handleRandomColor}
          className="w-full border border-black py-2 rounded hover:bg-gray-200 transition bg-white text-black cursor-pointer">
            Random Color
        </button>
        <ul className="space-y-2">
            {categories.map((color) => (
                <li key={color} className="hover:underline cursor-pointer" onClick={() => handleColorPick(color)}>                  
                    {color}
                </li>
            ))}
        </ul>
    </aside>
  )
}
