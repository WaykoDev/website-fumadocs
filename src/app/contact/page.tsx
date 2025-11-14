"use client";

import Link from 'next/link';
import NoScroll from '@/components/NoScroll';

export default function ContactPage() {
  return (
    <>
      <NoScroll />
      <style jsx global>{`
        /* Hide scrollbar */
        html, body {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }

        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>

      <div className="relative w-full">
      {/* Subtle cosmic background - very faint */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:py-28">
        {/* Hero Section - ~1/3 vertical space, golden ratio spacing */}
        <header className="mb-20 space-y-6 lg:mb-32">
          {/* Subtle cosmic halo behind title */}
          <div className="relative">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-10 blur-3xl">
              <div className="h-full w-full rounded-full bg-purple-500" />
            </div>

            <h1 className="font-mono text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Contact
            </h1>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Feel free to reach me. I'm not really into social media, but you can find me here:
          </p>

        </header>

        {/* Contact Methods Block - 4 equal columns on desktop */}
        <section className="mb-20 lg:mb-32">
          <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500">
            Direct channels
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Email (primary mode) */}
            <div className="space-y-3 border-l border-gray-200 dark:border-gray-800 pl-4 transition-all hover:border-[#8A2BE2]">
              <div className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                Email
              </div>
              <Link
                href="mailto:franck@chvl.re"
                className="block font-medium text-black dark:text-white underline-offset-4 transition-all hover:underline"
              >
                franck@chvl.re
              </Link>
            </div>

            {/* GitHub / GPG request */}
            <div className="space-y-3 border-l border-gray-200 dark:border-gray-800 pl-4 transition-all hover:border-[#8A2BE2]">
              <div className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                GitHub
              </div>
              <Link
                href="https://github.com/waykodev"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium text-black dark:text-white underline-offset-4 transition-all hover:underline"
              >
                @waykodev
              </Link>
            </div>

            {/* LinkedIn (professional presence only) */}
            <div className="space-y-3 border-l border-gray-200 dark:border-gray-800 pl-4 transition-all hover:border-[#8A2BE2]">
              <div className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                Social Media
              </div>
              <Link
                href="https://www.linkedin.com/in/franck-chevalier974/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium text-black dark:text-white underline-offset-4 transition-all hover:underline"
              >
                LinkedIn
              </Link>
            </div>

            {/* PGP Key */}
            <div className="space-y-3 border-l border-gray-200 dark:border-gray-800 pl-4 transition-all hover:border-[#8A2BE2]">
              <div className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                PGP Key
              </div>
              <a
                href="/wayko-pgp-public.asc"
                download
                className="block font-medium text-black dark:text-white underline-offset-4 transition-all hover:underline"
              >
                Download key
              </a>
            </div>
          </div>
        </section>

        {/* Subtle cosmic accent - faint constellation line */}
        <div className="relative mb-12 overflow-hidden">
          <div className="flex items-center justify-center opacity-20">
            <svg
              width="400"
              height="80"
              viewBox="0 0 400 80"
              className="text-[#8A2BE2]"
              aria-hidden="true"
            >
              {/* Subtle constellation lines - quiet space feeling */}
              <g stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4">
                <circle cx="50" cy="40" r="1.5" fill="currentColor" />
                <circle cx="150" cy="30" r="1" fill="currentColor" />
                <circle cx="250" cy="45" r="1.2" fill="currentColor" />
                <circle cx="350" cy="35" r="1" fill="currentColor" />

                <path d="M 50 40 Q 100 35, 150 30" />
                <path d="M 150 30 Q 200 37, 250 45" />
                <path d="M 250 45 Q 300 40, 350 35" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
