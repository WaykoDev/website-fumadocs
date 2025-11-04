'use client';

import Link from 'next/link';

export default function DisclosurePolicyPage() {
  return (
    <div className="relative w-full">
      {/* Subtle cosmic background - very faint */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-20 sm:px-8 lg:py-28">
        {/* Header */}
        <header className="mb-20 space-y-6">
          <div className="relative">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-10 blur-3xl">
              <div className="h-full w-full rounded-full bg-purple-500" />
            </div>

            <h1 className="font-mono text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Disclosure Policy
            </h1>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Coordinated disclosure framework for security researchers and organizations.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview - Highlighted bloc */}
          <section className="rounded-sm border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 p-8">
            <h2 className="mb-4 font-mono text-2xl font-semibold tracking-tight">
              Overview
            </h2>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              This policy outlines the process for responsible disclosure of security vulnerabilities.
              It applies to research conducted by Wayko and to researchers reporting findings to Wayko.
            </p>
          </section>

          {/* Reporting to Wayko */}
          <section className="space-y-6">
            <h2 className="font-mono text-2xl font-semibold tracking-tight">
              Reporting Security Issues
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Contact Methods Card */}
              <div className="group rounded-sm border border-gray-200 dark:border-gray-800 p-6 transition-all hover:border-[#8A2BE2]/50">
                <h3 className="mb-4 font-mono text-lg font-medium tracking-tight">
                  Contact Methods
                </h3>
                <div className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                      Email
                    </span>
                    <div className="mt-1">
                      <Link
                        href="mailto:franck@chvl.re"
                        className="text-[#8A2BE2] underline-offset-4 hover:underline"
                      >
                        franck@chvl.re
                      </Link>
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                      PGP
                    </span>
                    <div className="mt-1">Available upon request for sensitive disclosures</div>
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                      Response time
                    </span>
                    <div className="mt-1">Initial acknowledgment within 24–48 hours</div>
                  </div>
                </div>
              </div>

              {/* Required Information Card */}
              <div className="group rounded-sm border border-gray-200 dark:border-gray-800 p-6 transition-all hover:border-[#8A2BE2]/50">
                <h3 className="mb-4 font-mono text-lg font-medium tracking-tight">
                  Required Information
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Vulnerability description and potential impact</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Steps to reproduce (proof of concept)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Affected systems, versions, or configurations</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Any mitigating factors or workarounds discovered</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Your preferred disclosure timeline</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Wayko's Disclosure Process */}
          <section className="space-y-6">
            <h2 className="font-mono text-2xl font-semibold tracking-tight">
              Wayko's Disclosure Process
            </h2>

            {/* Timeline - Visual flow */}
            <div className="rounded-sm border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-transparent to-gray-50/50 dark:to-gray-900/50 p-8">
              <h3 className="mb-6 font-mono text-lg font-medium tracking-tight">
                Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#8A2BE2]/10 font-mono text-sm font-medium text-[#8A2BE2]">
                    0
                  </div>
                  <div className="pt-1">
                    <div className="font-medium text-black dark:text-white">Day 0</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Discovery and internal validation
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#8A2BE2]/10 font-mono text-sm font-medium text-[#8A2BE2]">
                    1
                  </div>
                  <div className="pt-1">
                    <div className="font-medium text-black dark:text-white">Day 1</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Initial contact with affected vendor
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-16 shrink-0 items-center justify-center rounded-sm bg-[#8A2BE2]/10 font-mono text-sm font-medium text-[#8A2BE2]">
                    1–90
                  </div>
                  <div className="pt-1">
                    <div className="font-medium text-black dark:text-white">Day 1–90</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Coordinated remediation period
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#8A2BE2]/10 font-mono text-sm font-medium text-[#8A2BE2]">
                    90+
                  </div>
                  <div className="pt-1">
                    <div className="font-medium text-black dark:text-white">Day 90+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Public disclosure (after patch availability or mutual agreement)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclosure Criteria */}
            <div className="rounded-sm border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="mb-4 font-mono text-lg font-medium tracking-tight">
                Disclosure Criteria
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                Public disclosure occurs when:
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                <li className="flex gap-2">
                  <span className="text-[#8A2BE2]">✓</span>
                  <span>Vendor has released and deployed a patch</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#8A2BE2]">✓</span>
                  <span>90-day disclosure deadline has passed</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#8A2BE2]">✓</span>
                  <span>Vulnerability is being actively exploited in the wild</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#8A2BE2]">✓</span>
                  <span>Mutual agreement with vendor is reached for earlier/later disclosure</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Safe Harbor - Important highlight */}
          <section className="rounded-sm border-l-4 border-[#8A2BE2] bg-[#8A2BE2]/5 p-8">
            <h2 className="mb-4 font-mono text-2xl font-semibold tracking-tight">
              Safe Harbor
            </h2>
            <p className="mb-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
              When conducting research on systems owned or operated by Wayko, the following
              activities are considered authorized and will not result in legal action:
            </p>
            <ul className="mb-6 space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">✓</span>
                <span>Testing for vulnerabilities in a non-destructive manner</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">✓</span>
                <span>Accessing only data necessary to demonstrate the vulnerability</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">✓</span>
                <span>Maintaining confidentiality until coordinated disclosure</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">✓</span>
                <span>Acting in good faith without malicious intent</span>
              </li>
            </ul>

            <div className="rounded-sm border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">
                Not covered
              </span>
              <p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                Denial of service attacks, social engineering, physical security testing, or
                third-party services without explicit authorization.
              </p>
            </div>
          </section>

          {/* Scope - Two column layout */}
          <section className="space-y-6">
            <h2 className="font-mono text-2xl font-semibold tracking-tight">
              Scope
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-sm border border-green-500/30 dark:border-green-500/20 bg-green-500/5 p-6">
                <h3 className="mb-4 font-mono text-lg font-medium tracking-tight text-green-700 dark:text-green-400">
                  In Scope
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-green-600 dark:text-green-500">✓</span>
                    <span>Web applications and APIs under wayko.dev domain</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 dark:text-green-500">✓</span>
                    <span>Public-facing infrastructure and services</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 dark:text-green-500">✓</span>
                    <span>Open source projects maintained by Wayko</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-sm border border-red-500/30 dark:border-red-500/20 bg-red-500/5 p-6">
                <h3 className="mb-4 font-mono text-lg font-medium tracking-tight text-red-700 dark:text-red-400">
                  Out of Scope
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-red-600 dark:text-red-500">✗</span>
                    <span>Third-party services or dependencies</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600 dark:text-red-500">✗</span>
                    <span>Social engineering attacks</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600 dark:text-red-500">✗</span>
                    <span>Physical security testing</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600 dark:text-red-500">✗</span>
                    <span>Denial of service attacks</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600 dark:text-red-500">✗</span>
                    <span>Spam or social media account compromise</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Recognition */}
          <section className="rounded-sm border border-gray-200 dark:border-gray-800 p-8">
            <h2 className="mb-4 font-mono text-2xl font-semibold tracking-tight">
              Recognition
            </h2>
            <p className="mb-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Researchers who report valid security issues following this policy will be:
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">→</span>
                <span>Credited in public disclosure (if desired)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">→</span>
                <span>Kept informed throughout the remediation process</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">→</span>
                <span>Given reasonable time for independent publication after coordinated disclosure</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Footer navigation */}
        <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="font-mono text-sm text-gray-600 dark:text-gray-400 underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
            >
              ← Back to contact
            </Link>
            <Link
              href="/research-ethics"
              className="font-mono text-sm text-gray-600 dark:text-gray-400 underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
            >
              Research ethics →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
