'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { HexColor } from '@/types/definitions'

export default function ColorPage() {
    const router = useRouter()
    const params = useParams()
    const [colorData, setColorData] = useState<HexColor>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getColor = async () => {
            try {
              const response = await fetch(`/api/get_color?slug=${params.slug}`)
              if (!response.ok) throw new Error('Failed to fetch color data')
              const data = await response.json()
              setColorData(data)
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
    <div className='flex flex-col flex-1'>
        <div className="border rounded-lg showdow-sm mb-4">
            <div
            className="h-64 sm:h-80 rounded-t-lg"
            style={{ backgroundColor: colorData?.hex_code }}
            />
            <div className="p-4 text-xl font-mono text-gray-800">#{colorData?.hex_code}</div>
        </div>
    </div>
  )
}
