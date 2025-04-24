'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getRandomColor } from '../actions/colorActions'

const categories = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Gray'];

export default function SideBar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRandomColor = async () => {
    try {
      setIsLoading(true);
      const colorData = await getRandomColor();
      
      if (colorData) {
        router.push(`/color/${colorData.slug}`);
      }
    } catch (error) {
      console.error('Failed to fetch random color:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleColorPick = (color: string) => {
    router.push(`/directory/1?q=${encodeURIComponent(color)}`);
  };

  return (
    <aside className="w-48 bg-gray-400 p-4 space-y-4 min-h-screen">
      <button 
        onClick={handleRandomColor}
        disabled={isLoading}
        className="w-full border border-black py-2 rounded hover:bg-gray-200 transition bg-white text-black cursor-pointer">
          {isLoading ? 'Loading...' : 'Random Color'}
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