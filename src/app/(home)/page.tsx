
import { Intro } from "@/components/Intro";
import BackgroundGalaxy from "@/components/BackgroundGalaxy";
import NoScroll from "@/components/NoScroll";

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center h-screen overflow-hidden text-black transition-colors duration-300 dark:text-white">
      <NoScroll />
      {/* Fond Galaxy */}
      <div className="absolute inset-0 z-0">
        <BackgroundGalaxy />
      </div>

      {/* Contenu centré */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
        {/* Composant d'introduction (optionnel si tu veux plus d'effet) */}
        <Intro />
      </div>
    </main>
  );
}
