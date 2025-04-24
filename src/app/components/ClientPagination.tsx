'use client'
import { useRouter } from 'next/navigation';
import Pagination from './Pagination';

export default function ClientPagination({
  currentPage,
  totalResults,
  resultsPerPage,
  query,
}: {
  currentPage: number;
  totalResults: number;
  resultsPerPage: number;
  query: string;
}) {
  const router = useRouter();
  
  const handlePageChange = (page: number) => {
    const url = query 
      ? `/directory/${page}?q=${encodeURIComponent(query)}` 
      : `/directory/${page}`;
    router.push(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <Pagination
      currentPage={currentPage}
      totalResults={totalResults}
      resultsPerPage={resultsPerPage}
      onPageChange={handlePageChange}
      query={query}
    />
  );
}