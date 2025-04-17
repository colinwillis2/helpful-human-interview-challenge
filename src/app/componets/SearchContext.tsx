'use client'
import React, { createContext, useState, useContext } from 'react'

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
}

const SearchContext = createContext({
  query: '',
  setQuery: (query: string) => {},
})

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [query, setQuery] = useState('')
    return (
        <SearchContext.Provider value={{ query, setQuery }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
}