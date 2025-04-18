import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const colorSlug = searchParams.get('slug');
  const colorName = searchParams.get('name');
  
  try {
    const color = await prisma.colors.findFirst({
      where: {
        OR: [
          { slug: colorSlug || undefined },
          { name: colorName || undefined }
        ]
      }
    });
  
    if (!color) {
      return NextResponse.json({ error: 'Color not found' }, { status: 404 });
    }

    const colorGroups = await prisma.color_group_assignments.findMany({
      where: {
        color_id: color.id
      },
      include: {
        color_groups: true
      },
      take: 12
    })

    const relatedColors = await prisma.color_group_assignments.findMany({
      where: {
        group_id: { in: colorGroups.map(cg => cg.group_id) },
        color_id: { not: color.id }
      },
      include: {
        colors: true
      }
    })
    
    const uniqueColors = Array.from(
      new Map(relatedColors.map(c => [c.colors.id, c.colors])).values()
    ).slice(0, 10);
  
    return NextResponse.json({
      mainColor: color,
      relatedColors: uniqueColors
    });
  } catch (error) {
    console.error('Error fetching color:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}