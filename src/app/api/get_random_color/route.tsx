import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const colorsCount = await prisma.hex_colors.count();
    const skip = Math.floor(Math.random() * colorsCount);
    
    const randomColor = await prisma.hex_colors.findFirst({
      skip: skip,
      take: 1,
    });
  
    return NextResponse.json(randomColor);
  } catch (error) {
    console.error('Error fetching random color:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 