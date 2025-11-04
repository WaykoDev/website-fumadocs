'use client';

import Link from 'next/link';

export default function ResearchEthicsPage() {
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
              Research Ethics
            </h1>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Principles and ethical framework governing security research practices.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8">
          {/* Core Principles - Grid layout */}
          <section className="space-y-6">
            <h2 className="font-mono text-2xl font-semibold tracking-tight">
              Core Principles
            </h2>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              All security research conducted by Wayko adheres to the following foundational principles:
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="group rounded-sm border border-gray-200 dark:border-gray-800 p-6 transition-all hover:border-[#8A2BE2]/50">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#8A2BE2]/10 text-[#8A2BE2]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-mono text-lg font-medium tracking-tight">
                    Do No Harm
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  Research activities must not cause damage to systems, services, or data.
                  Testing is limited to demonstrating vulnerabilities without exploiting them for harm.
                </p>
              </div>

              <div className="group rounded-sm border border-gray-200 dark:border-gray-800 p-6 transition-all hover:border-[#8A2BE2]/50">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#8A2BE2]/10 text-[#8A2BE2]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-mono text-lg font-medium tracking-tight">
                    Respect Privacy
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  Personal data accessed during research is handled with strict confidentiality.
                  No user data is retained, shared, or used beyond what is necessary to demonstrate a finding.
                </p>
              </div>

              <div className="group rounded-sm border border-gray-200 dark:border-gray-800 p-6 transition-all hover:border-[#8A2BE2]/50">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#8A2BE2]/10 text-[#8A2BE2]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="font-mono text-lg font-medium tracking-tight">
                    Responsible Disclosure
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  Vulnerabilities are reported privately to affected parties before public disclosure.
                  Reasonable time is provided for remediation following coordinated timelines.
                </p>
              </div>

              <div className="group rounded-sm border border-gray-200 dark:border-gray-800 p-6 transition-all hover:border-[#8A2BE2]/50">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#8A2BE2]/10 text-[#8A2BE2]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-mono text-lg font-medium tracking-tight">
                    Proper Authorization
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  Research is conducted only on systems where explicit permission has been obtained
                  or where legal safe harbor provisions apply.
                </p>
              </div>
            </div>
          </section>

          {/* Research Methodology */}
          <section className="space-y-6">
            <h2 className="font-mono text-2xl font-semibold tracking-tight">
              Research Methodology
            </h2>

            <div className="rounded-sm border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-transparent to-gray-50/50 dark:to-gray-900/50 p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-mono text-lg font-medium tracking-tight">
                    Scope Definition
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    Before conducting research, scope is clearly defined:
                  </p>
                  <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Target systems and boundaries are identified</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Authorization status is verified</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Potential impact is assessed</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Necessary safeguards are implemented</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <h3 className="mb-3 font-mono text-lg font-medium tracking-tight">
                    Minimal Intrusion
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    Testing is conducted using the least invasive methods necessary:
                  </p>
                  <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Read-only testing preferred over write operations</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Proof-of-concept limited to minimum viable demonstration</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Testing in isolated environments when possible</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Automated scanning calibrated to avoid service disruption</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <h3 className="mb-3 font-mono text-lg font-medium tracking-tight">
                    Documentation
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    Research processes are thoroughly documented:
                  </p>
                  <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Methodology and tools used</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Findings and evidence</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Reproduction steps</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#8A2BE2]">→</span>
                      <span>Impact assessment and recommendations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Publication Ethics */}
          <section className="space-y-6">
            <h2 className="font-mono text-2xl font-semibold tracking-tight">
              Publication Ethics
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-sm border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="mb-4 font-mono text-base font-medium tracking-tight">
                  Coordinated Disclosure
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Affected parties notified before publication</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Reasonable remediation period (typically 90 days)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Technical details withheld if patches not deployed</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Coordinated with vendor when possible</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-sm border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="mb-4 font-mono text-base font-medium tracking-tight">
                  Content Standards
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Accuracy and verifiability</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Clear explanation of impact</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Proper attribution</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Sensitive info redacted</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Educational focus</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-sm border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="mb-4 font-mono text-base font-medium tracking-tight">
                  Exploit Code Policy
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Only after patches deployed</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Weaponization details omitted</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Educational context provided</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">✓</span>
                    <span>Mitigations included</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Collaboration */}
          <section className="space-y-6">
            <h2 className="font-mono text-2xl font-semibold tracking-tight">
              Collaboration
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-sm border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="mb-4 font-mono text-lg font-medium tracking-tight">
                  Vendor Engagement
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  Working with affected vendors is approached with professionalism:
                </p>
                <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Clear, actionable vulnerability reports</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Responsive communication throughout disclosure process</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Flexibility in timelines when vendors demonstrate good faith</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Recognition of vendor remediation efforts</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-sm border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="mb-4 font-mono text-lg font-medium tracking-tight">
                  Community Standards
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  Engagement with the security research community follows norms of:
                </p>
                <ul className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Peer review and validation before publication</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Credit to prior work and parallel discoveries</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Constructive discourse on methods and findings</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8A2BE2]">→</span>
                    <span>Mentorship and knowledge sharing</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Legal Compliance */}
          <section className="rounded-sm border-l-4 border-[#8A2BE2] bg-[#8A2BE2]/5 p-8">
            <h2 className="mb-4 font-mono text-2xl font-semibold tracking-tight">
              Legal Compliance
            </h2>
            <p className="mb-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
              All research activities comply with applicable laws and regulations:
            </p>
            <ul className="mb-6 space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">✓</span>
                <span>Computer fraud and abuse statutes</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">✓</span>
                <span>Data protection and privacy regulations (GDPR, CCPA, etc.)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">✓</span>
                <span>Intellectual property and copyright law</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">✓</span>
                <span>Export controls on security tools and information</span>
              </li>
            </ul>
            <div className="rounded-sm border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 px-4 py-3">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                When legal ambiguity exists, research errs on the side of caution and seeks
                explicit authorization.
              </p>
            </div>
          </section>

          {/* Accountability */}
          <section className="rounded-sm border border-gray-200 dark:border-gray-800 p-8">
            <h2 className="mb-4 font-mono text-2xl font-semibold tracking-tight">
              Accountability
            </h2>
            <p className="mb-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Wayko is committed to ethical accountability:
            </p>
            <ul className="mb-6 space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">→</span>
                <span>Regular review and updates to ethical guidelines</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">→</span>
                <span>Transparent communication about research practices</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">→</span>
                <span>Receptiveness to community feedback and criticism</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8A2BE2]">→</span>
                <span>Willingness to acknowledge and correct mistakes</span>
              </li>
            </ul>
            <div className="rounded-sm border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 px-4 py-3">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                Questions or concerns about research ethics can be directed to{' '}
                <Link
                  href="mailto:franck@chvl.re"
                  className="text-[#8A2BE2] underline-offset-4 hover:underline"
                >
                  franck@chvl.re
                </Link>
                .
              </p>
            </div>
          </section>
        </div>

        {/* Footer navigation */}
        <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/disclosure-policy"
              className="font-mono text-sm text-gray-600 dark:text-gray-400 underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
            >
              ← Disclosure policy
            </Link>
            <Link
              href="/contact"
              className="font-mono text-sm text-gray-600 dark:text-gray-400 underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
            >
              Back to contact →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
