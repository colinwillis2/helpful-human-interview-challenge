import { searchColors } from '@/app/actions/colorActions';
import ColorCard from '@/app/components/ColorCard';
import ClientPagination from '@/app/components/ClientPagination';
import { Suspense } from 'react';

export default async function DirectoryPage({ params, searchParams, }: { params: Promise<{ page?: string }>; searchParams: Promise<{ q?: string }>; }) {
  
  const currentParams = await params;
  const currentPage = currentParams.page ? parseInt(currentParams.page, 10) : 1;
  const query = (await searchParams).q || '';
  const resultsPerPage = 12;
  
  const { data: colors, totalResults } = await searchColors(query, currentPage, resultsPerPage);

  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<div>Loading colors...</div>}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {colors.map((color: any) => (
            <ColorCard key={color.id} color={color} />
          ))}
        </div>
        <ClientPagination
          currentPage={currentPage}
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          query={query}
        />
      </Suspense>
    </div>
  );
}
