import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const colorSlug = searchParams.get('slug');
  
  try {
    const color = await prisma.hex_colors.findUnique({
      where: {
        slug: colorSlug ?? undefined,
      }
    })
  
    return NextResponse.json(color);
  } catch (error) {
    console.error('Error fetching color:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}