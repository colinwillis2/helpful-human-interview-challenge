'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useState, useEffect } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [queryInput, setQueryInput] = useState('')
  const [isPending, startTransition] = useTransition()
  
  useEffect(() => {
    setQueryInput(searchParams.get('q') || '')
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(() => {
      const url = queryInput 
        ? `/directory/1?q=${encodeURIComponent(queryInput)}` 
        : '/'
      router.push(url)
    })
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black" 
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            disabled={isPending}
          />
          {isPending && <span className="absolute right-2 top-2">Loading...</span>}
        </div>
      </form>
    </div>
  )
}