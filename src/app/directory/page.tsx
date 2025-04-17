'use client'
import React, { useState } from 'react'
import ColorCard from '@/app/componets/ColorCard'
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Pagination from '@/app/componets/Pagination';
import { useSearch } from '@/app/componets/SearchContext';

export default function DirectoryPage() {
    const { query, setQuery } = useSearch();
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const resultsPerPage = 12;
    const searchParams = useSearchParams();
    const params = useParams();
    const router = useRouter();
    const page = searchParams.get('page') || '1';
    const pageParam = params?.page;
    const currentPage = pageParam ? parseInt(pageParam as string, 10) : 1

    useEffect(() => {
        const q = searchParams.get('q') || '';
        setQuery(q);
    }, [searchParams, setQuery]);

    const handleSearch = async (page: number = 1) => {
        try {
            const url = new URL('/api/color_search', window.location.origin);

            if (query.trim() !== '') {
                url.searchParams.set('q', query);
            }

            url.searchParams.set('page', page.toString());
            url.searchParams.set('perPage', resultsPerPage.toString());
            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error('Failed to fetch results');
            }

            const data = await response.json();
            setResults(data.data);
            setTotalResults(data.totalResults);
        } catch (error) {
            console.error('Error fetching results:', error);
            setResults([]);
            setTotalResults(0);
        }
    };

    useEffect(() => {
        handleSearch(currentPage);
    }, [currentPage, searchParams]);

    const handlePageChange = (page: number) => {
        const url = query ? `/directory/${page}?q=${encodeURIComponent(query)}` : `/directory/${page}`;
        router.push(url);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

    return (  
      <>
        <div className="flex flex-col flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {results.map((color: any) => (
              <ColorCard key={color.id} color={color} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onPageChange={handlePageChange}
            query={query}
            />
        </div>
      </>
    )
}
