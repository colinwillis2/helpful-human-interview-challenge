import React from 'react'
import { HexColor } from '@/types/definitions';

type ColorCardProps = {
    color: HexColor;
};

export default function ColorCard({ color }: ColorCardProps) {
  return (
    <div className="rounded shadow bg-white overflow-hidden">
        <a href={`/color/${color.slug}`}>
            <div className="h-32" style={{ backgroundColor: color.hex_code }}>
                {color.name}
            </div>
        <div className="p-2 text-center text-sm text-gray-600">{color.hex_code}</div>
        </a>
    </div>
  )
}
