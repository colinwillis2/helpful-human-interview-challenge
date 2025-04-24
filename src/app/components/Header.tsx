'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import logoSymbol from '../../../public/logo-symbol.svg'
import SearchBar from './SearchBar'
import { useSearch } from './SearchContext'


export default function Header() {
  const { setQuery } = useSearch()

  const handleClearQuery = () => {
    setQuery('')
  }
  return (
    <header className="min-h-14 flex justify-between px-10" style={{ backgroundColor: '#4f5e5d' }}>
            <div className="flex items-center relative">
                <div className="flex">
                    <Link href="/" onClick={handleClearQuery}>
                        <Image src={logoSymbol} alt="logo" width={32} height={32} />
                    </Link>
                </div>
            </div>
                <div className="flex items-center justify-end">
                    <SearchBar />
                </div>
        
    </header>
  )
}
