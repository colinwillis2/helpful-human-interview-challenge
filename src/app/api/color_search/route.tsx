import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const pageNumber = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '12');
  
  try {
    let colors;
    let totalResults;
    
    if (query) {
      const searchTerms = query.trim().split(/\s+/);
      colors = await prisma.colors.findMany({
        where: {
            OR: searchTerms.map(term => ({
                name: {
                    contains: term,
                    mode: 'insensitive',
                },
            })),
        },
      });
    } else {
      colors = await prisma.colors.findMany({});
    }
    
      totalResults = colors.length;
      const paginatedColors = colors.slice((pageNumber - 1) * perPage, pageNumber * perPage);

    return NextResponse.json({
      data: paginatedColors,
      totalResults,
    });
  } catch (error) {
    console.error('Error searching colors:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}