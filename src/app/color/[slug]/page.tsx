import { getColorBySlug } from '@/app/actions/colorActions';
import ColorCard from '@/app/components/ColorCard';
import { notFound } from 'next/navigation';

export default async function ColorPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const currentParams = await params;
    const { mainColor, relatedColors } = await getColorBySlug(currentParams.slug);
    
    return (
      <div className='flex flex-col flex-1 p-4'>
        <div className="border rounded-xl border-black shadow-md mb-8">
          <div
            className="h-64 sm:h-80 rounded-t-lg"
            style={{ backgroundColor: mainColor?.hex_code }}
          />
          <div className="p-4">
            <div className="text-xl font-mono text-gray-800">{mainColor?.hex_code}</div>
          </div>
        </div>

        {relatedColors.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Related Colors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {relatedColors.map((color: any) => (
                <ColorCard key={color.id} color={color} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return notFound();
  }
}