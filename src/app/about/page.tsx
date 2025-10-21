import { FranckShowcase } from '@/components/franck-showcase';

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col items-center bg-gradient-to-b from-[#0d041c] via-[#13072c] to-[#0d041c] py-16">
      <div className="w-full max-w-6xl px-4">
        <FranckShowcase />
      </div>
    </main>
  );
}
