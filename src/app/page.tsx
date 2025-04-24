import DirectoryPage from "@/app/directory/[page]/page";

export default function Home() {
  return (
    <>
      <div className="flex flex-col flex-1">
        <DirectoryPage params={ Promise.resolve({ page: '1' }) } searchParams={ Promise.resolve({ q: '' }) } />
      </div>
    </>
  );
}
