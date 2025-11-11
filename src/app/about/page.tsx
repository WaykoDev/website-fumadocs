"use client";

import StarfieldBackground from "@/components/StarfieldBackground";

export default function AboutPage() {
  return (
    <>
      <StarfieldBackground />

      <div className="min-h-screen flex items-center justify-center px-4 py-16 sm:px-6 md:px-8">
        <main className="max-w-3xl w-full space-y-12 animate-in fade-in duration-1000">
          {/* Header Section */}
          <section className="space-y-4 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Franck Chevalier
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
              Pentester at{" "}
              <a
                href="https://www.lexfo.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-2 underline-offset-4 hover:text-foreground transition-colors"
              >
                Lexfo
              </a>
            </p>
          </section>

          {/* Tagline */}
          <section className="text-center">
            <p className="text-base sm:text-lg italic text-muted-foreground max-w-2xl mx-auto">
              "Be part of the solution, not the pollution"
            </p>
          </section>

          {/* Bio Section */}
          <section className="space-y-6">
            <div className="h-px bg-border w-24 mx-auto" />

            <div className="prose prose-neutral dark:prose-invert mx-auto max-w-2xl">
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                If you've made it to this page, hello, welcome!
              </p>

              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                Self-taught and passionate, studying at Ecole 2600. I have a great sense of
                organization. I'm very involved in open source software and I'm always looking
                to learn new things, checking new technologies on social networks or IRC.
              </p>
            </div>
          </section>

          {/* Certifications & Achievements */}
          <section className="space-y-6">
            <div className="h-px bg-border w-24 mx-auto" />

            <div className="space-y-4 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold">Certifications</h2>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {["OSCP", "OSWA", "KLCP", "CBBH"].map((cert) => (
                  <span
                    key={cert}
                    className="px-4 py-2 rounded-full bg-accent/50 text-sm sm:text-base font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* CTF Teams */}
          <section className="space-y-6 pb-8">
            <div className="h-px bg-border w-24 mx-auto" />

            <div className="text-center space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold">CTF Player</h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Phreaks2600 • Lexfo
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}