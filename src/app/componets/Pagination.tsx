import Link from 'next/link';
import React from 'react'

type PaginationProps = {
    currentPage: number;
    totalResults: number;
    resultsPerPage: number;
    onPageChange: (page: number) => void;
    query: string;
}

export default function Pagination({ currentPage, totalResults, resultsPerPage, onPageChange, query }: PaginationProps) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    if (totalPages <= 0) return null;

    const maxVisiblePages = 5;
    let startPage: number;
    let endPage: number;

    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const middlePage = Math.floor(maxVisiblePages / 2);
        if (currentPage <= middlePage + 1) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + middlePage >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - middlePage;
            endPage = currentPage + middlePage;
        }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

  return (
    <div className="mt-10 flex justify-center space-x-2 text-gray-700 text-sm">
        <ul className="inline-flex items-center space-x-2">
            <li>
                {currentPage > 1 ? (
                    <Link href={`/directory/${currentPage - 1}?q=${encodeURIComponent(query)}`} className={`px-3 py-2 border rounded bg-white hover:bg-gray-100`}>
                        Previous
                    </Link>
                ) : (
                <button className={`px-3 py-2 border rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                )}
            </li>
            {startPage > 1 && (
                <>
                    <li>
                        <Link href={`/directory/1?q=${encodeURIComponent(query)}`} className={`px-3 py-2 border rounded bg-white hover:bg-gray-100`}>
                            1
                        </Link>
                    </li>
                    {startPage > 2 && <li>...</li>}
                </>
            )}            
            {pages.map((page) => (
                <li key={page}>
                    {page === currentPage ? (
                        <span className="px-3 py-2 rounded underline font-bold">{page}</span>
                    ) : (
                        <Link href={`/directory/${page}?q=${encodeURIComponent(query)}`} className={`px-3 py-2  bg-white hover:bg-gray-100`}>                            
                        {page}
                    </Link>                        
                    )}
                </li>
            ))}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <li>...</li>}
                    <li>
                        <Link href={`/directory/${totalPages}?q=${encodeURIComponent(query)}`} className={`px-3 py-2 bg-white hover:bg-gray-100`}>
                            {totalPages}
                        </Link>
                    </li>
                </>
            )}
            <li>
                {currentPage < totalPages ? (
                    <Link href={`/directory/${currentPage + 1}?q=${encodeURIComponent(query)}`} className={`px-3 py-2 border rounded bg-white hover:bg-gray-100`}>
                        Next
                    </Link>
                ) : (
                    <button className={`px-3 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                </button>
                )}
            </li>                    
        </ul>
    </div>
  )
}
