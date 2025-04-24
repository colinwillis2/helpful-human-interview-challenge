import React from 'react'
import { HexColor } from '@/types/definitions';

type ColorCardProps = {
    color: HexColor;
};

export default function ColorCard({ color }: ColorCardProps) {
  return (
    <div className="rounded shadow-md bg-white overflow-hidden group cursor-pointer">
        <a href={`/color/${color.slug}`}>
            <div className="h-32 relative transition" style={{ backgroundColor: color.hex_code }}>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-300 transition" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 text-white font-bold">
                {color.name}
              </div>
            </div>
        <div className="p-2 text-center text-sm text-gray-600">{color.hex_code}</div>
        </a>
    </div>
  )
}
