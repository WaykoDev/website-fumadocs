'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    isSecurityDisclosure: false,
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
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
              Contact Wayko
            </h1>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            For research collaborations, disclosure, consulting inquiries, or technical discussion.
          </p>

          <p className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
            PGP available upon request
          </p>
        </header>

        {/* Contact Methods Block - 3 equal columns on desktop */}
        <section className="mb-20 lg:mb-32">
          <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500">
            Direct channels
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Email (primary mode) */}
            <div className="group space-y-3 border-l border-gray-200 dark:border-gray-800 pl-4 transition-all hover:border-[#8A2BE2]">
              <div className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                Email
              </div>
              <Link
                href="mailto:franck@chvl.re"
                className="block font-medium text-black dark:text-white underline-offset-4 transition-all hover:underline"
              >
                franck@chvl.re
              </Link>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                Response in 24–48h if relevant
              </p>
            </div>

            {/* GitHub / GPG request */}
            <div className="group space-y-3 border-l border-gray-200 dark:border-gray-800 pl-4 transition-all hover:border-[#8A2BE2]">
              <div className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                GitHub / GPG
              </div>
              <Link
                href="https://github.com/waykodev"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium text-black dark:text-white underline-offset-4 transition-all hover:underline"
              >
                @waykodev
              </Link>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                Public keys & code verification
              </p>
            </div>

            {/* LinkedIn (professional presence only) */}
            <div className="group space-y-3 border-l border-gray-200 dark:border-gray-800 pl-4 transition-all hover:border-[#8A2BE2]">
              <div className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                LinkedIn
              </div>
              <Link
                href="https://www.linkedin.com/in/franck-chevalier974/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium text-black dark:text-white underline-offset-4 transition-all hover:underline"
              >
                Professional presence
              </Link>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                Industry updates & connections
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form - ~2/3 vertical space */}
        <section className="mb-20">
          <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500">
            Send a message
          </h2>

          <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
            {/* Name field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                className={`w-full border bg-transparent px-4 py-3 text-black dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none ${
                  focusedField === 'name'
                    ? 'border-[#8A2BE2] shadow-[0_0_12px_rgba(138,43,226,0.3)]'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
                placeholder="Your name"
              />
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className={`w-full border bg-transparent px-4 py-3 text-black dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none ${
                  focusedField === 'email'
                    ? 'border-[#8A2BE2] shadow-[0_0_12px_rgba(138,43,226,0.3)]'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
                placeholder="your@email.com"
              />
            </div>

            {/* Company / Org (optional) */}
            <div className="space-y-2">
              <label
                htmlFor="company"
                className="block font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400"
              >
                Company / Org{' '}
                <span className="text-gray-500 dark:text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onFocus={() => setFocusedField('company')}
                onBlur={() => setFocusedField(null)}
                className={`w-full border bg-transparent px-4 py-3 text-black dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none ${
                  focusedField === 'company'
                    ? 'border-[#8A2BE2] shadow-[0_0_12px_rgba(138,43,226,0.3)]'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
                placeholder="Organization name"
              />
            </div>

            {/* Message field */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={6}
                className={`w-full resize-none border bg-transparent px-4 py-3 text-black dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none ${
                  focusedField === 'message'
                    ? 'border-[#8A2BE2] shadow-[0_0_12px_rgba(138,43,226,0.3)]'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
                placeholder="Describe your inquiry..."
              />
            </div>

            {/* Security disclosure toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={formData.isSecurityDisclosure}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isSecurityDisclosure: !prev.isSecurityDisclosure,
                  }))
                }
                className={`relative h-6 w-11 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black ${
                  formData.isSecurityDisclosure ? 'bg-[#8A2BE2]' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                    formData.isSecurityDisclosure ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Security-related disclosure
              </label>
            </div>

            {/* Submit button */}
            <div className="space-y-4 pt-4">
              <button
                type="submit"
                className="border border-gray-300 dark:border-gray-700 bg-transparent px-8 py-3 font-mono text-sm uppercase tracking-wider text-black dark:text-white transition-all hover:border-[#8A2BE2] hover:shadow-[0_0_12px_rgba(138,43,226,0.2)] focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
              >
                Send message
              </button>

              {/* Status messages - simple and clear */}
              {formStatus === 'success' && (
                <p className="text-sm text-[#8A2BE2]">
                  Message sent successfully. Response within 24–48h.
                </p>
              )}
              {formStatus === 'error' && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Error sending message. Please try email directly.
                </p>
              )}

              {/* Micro-copy bottom line */}
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-500">
                GPG available if required. Serious requests only.
                <br />
                No unsolicited marketing — security inquiries only.
              </p>
            </div>
          </form>
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

        {/* Footer - minimal */}
        <footer className="border-t border-gray-200 dark:border-gray-800 pt-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-mono text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} Wayko
            </p>
            <div className="flex gap-6 font-mono text-xs text-gray-500 dark:text-gray-500">
              <Link
                href="/disclosure-policy"
                className="transition-colors hover:text-gray-700 dark:hover:text-gray-300"
              >
                Disclosure policy
              </Link>
              <Link
                href="/research-ethics"
                className="transition-colors hover:text-gray-700 dark:hover:text-gray-300"
              >
                Research ethics
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
