
import { Intro } from "@/components/Intro";
import BackgroundGalaxy from "@/components/BackgroundGalaxy";

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">
      {/* Fond Galaxy */}
      <div className="absolute inset-0 z-0">
        <BackgroundGalaxy />
      </div>

      {/* Contenu centré */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
        {/* Composant d’introduction (optionnel si tu veux plus d’effet) */}
        <Intro />
      </div>
    </main>
  );
}















// import Link from 'next/link';

// export default function HomePage() {
//   return (
//     <main className="flex flex-1 flex-col justify-center text-center">
//       <h1 className="mb-4 text-2xl font-bold">Hello World</h1>
//       <p className="text-fd-muted-foreground">
//         You can open{' '}
//         <Link
//           href="/docs"
//           className="text-fd-foreground font-semibold underline"
//         >
//           /docs
//         </Link>{' '}
//         and see the documentation.
//       </p>
//     </main>
//   );
// }
