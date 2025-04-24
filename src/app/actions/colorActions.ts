'use server'
import prisma from '@/lib/prisma'

export async function searchColors(query: string = '', page: number = 1, perPage: number = 12) {
  try {
    let colors;
    
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
    
    const totalResults = colors.length;
    const paginatedColors = colors.slice((page - 1) * perPage, page * perPage);

    return {
      data: paginatedColors,
      totalResults,
    };
  } catch (error) {
    console.error('Error searching colors:', error);
    throw new Error('Failed to search colors');
  }
}

export async function getColorBySlug(slug: string) {
  try {
    const color = await prisma.colors.findFirst({
      where: { slug }
    });
  
    if (!color) {
      throw new Error('Color not found');
    }

    const colorGroups = await prisma.color_group_assignments.findMany({
      where: {
        color_id: color.id
      },
      include: {
        color_groups: true
      },
      take: 12
    });

    const relatedColors = await prisma.color_group_assignments.findMany({
      where: {
        group_id: { in: colorGroups.map(cg => cg.group_id) },
        color_id: { not: color.id }
      },
      include: {
        colors: true
      }
    });
    
    const uniqueColors = Array.from(
      new Map(relatedColors.map(c => [c.colors.id, c.colors])).values()
    ).slice(0, 10);
  
    return {
      mainColor: color,
      relatedColors: uniqueColors
    };
  } catch (error) {
    console.error('Error fetching color:', error);
    throw error;
  }
}

export async function getRandomColor() {
  try {
    const colorsCount = await prisma.colors.count();
    const skip = Math.floor(Math.random() * colorsCount);
    
    const randomColor = await prisma.colors.findFirst({
      skip: skip,
      take: 1,
    });
  
    return randomColor;
  } catch (error) {
    console.error('Error fetching random color:', error);
    throw new Error('Failed to fetch random color');
  }
}