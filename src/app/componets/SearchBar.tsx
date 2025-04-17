'use client'
import React, { KeyboardEvent } from 'react'
import { useSearch } from './SearchContext'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const { query, setQuery } = useSearch()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const url = query ? `/directory/1?q=${encodeURIComponent(query)}` : '/'
    router.push(url)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch}>
        <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black" 
              value={query}
              onChange={handleChange}
            />
        </div>
      </form>
    </div>
  )
}
