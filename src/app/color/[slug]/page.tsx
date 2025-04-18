'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { HexColor } from '@/types/definitions'
import ColorCard from '@/app/componets/ColorCard'

export default function ColorPage() {
    const router = useRouter()
    const params = useParams()
    const [colorData, setColorData] = useState<HexColor>()
    const [relatedColors, setRelatedColors] = useState<HexColor[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getColor = async () => {
            try {
              setLoading(true)
              const response = await fetch(`/api/get_color?slug=${params.slug}`)
              if (!response.ok) throw new Error('Failed to fetch color data')
              const data = await response.json()
              setColorData(data.mainColor)
              setRelatedColors(data.relatedColors)
            } catch (error) {
              console.error('Error fetching color:', error)
              setError('Failed to load color data')
            } finally {
              setLoading(false)
            }
          }
          getColor()
    }, [params.slug])

  return (
    <div className='flex flex-col flex-1 p-4'>
    {loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div className="text-red-500">{error}</div>
    ) : (
        <>
            <div className="border rounded-xl border-black shadow-md mb-8">
                <div
                    className="h-64 sm:h-80 rounded-t-lg"
                    style={{ backgroundColor: colorData?.hex_code }}
                />
                <div className="p-4">
                    <div className="text-xl font-mono text-gray-800">{colorData?.hex_code}</div>
                </div>
            </div>

            {relatedColors.length > 0 && (
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {relatedColors.map((color: any) => (
                            <ColorCard key={color.id} color={color} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )}
</div>
  )
}