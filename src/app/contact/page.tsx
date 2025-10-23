import type { SVGProps } from "react";
import Link from "next/link";

type IconProps = SVGProps<SVGSVGElement>;

function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22.23 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.46c.98 0 1.77-.78 1.77-1.74V1.74C24 .78 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.13 0-2.04-.92-2.04-2.06 0-1.13.91-2.05 2.04-2.05 1.12 0 2.04.92 2.04 2.05 0 1.14-.91 2.06-2.04 2.06zM20.45 20.45h-3.56v-5.46c0-1.3-.02-2.97-1.81-2.97-1.81 0-2.09 1.38-2.09 2.88v5.55h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.28 2.37 4.28 5.45v6.29z" />
    </svg>
  );
}

function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.95 4.57a10 10 0 0 1-2.82.77 4.93 4.93 0 0 0 2.17-2.72 9.86 9.86 0 0 1-3.13 1.19 4.92 4.92 0 0 0-8.49 4.48A13.95 13.95 0 0 1 1.67 3.15a4.9 4.9 0 0 0-.67 2.48 4.92 4.92 0 0 0 2.19 4.1 4.86 4.86 0 0 1-2.23-.62v.06a4.93 4.93 0 0 0 3.95 4.83 4.9 4.9 0 0 1-2.22.08 4.93 4.93 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54 13.94 13.94 0 0 0 7.55 21.7c9.05 0 14-7.5 14-14 0-.21 0-.41-.02-.62a9.98 9.98 0 0 0 2.42-2.51z" />
    </svg>
  );
}

const EmailLink: React.FC<{ className?: string }> = ({ className }) => (
  <Link
    href="mailto:franck@chvl.re"
    className={`flex items-center justify-between rounded-2xl border border-fuchsia-200 bg-white px-4 py-4 text-sm shadow-sm transition hover:border-fuchsia-400 hover:shadow-md dark:border-fuchsia-500/30 dark:bg-neutral-900/60 dark:text-neutral-50 dark:hover:border-fuchsia-400 ${className ?? ""}`}
  >
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-200">
        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} fill="none" aria-hidden="true" className="h-5 w-5">
          <rect x="3" y="5" width="18" height="14" rx="2.2" />
          <path d="M4 7 12 12.5 20 7" />
          <path d="m20 17-5.5-4" />
          <path d="m4 17 5.5-4" />
        </svg>
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          Email direct
        </p>
        <p className="font-semibold text-neutral-900 dark:text-neutral-50">franck@chvl.re</p>
      </div>
    </div>
    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
      Réponse rapide
    </span>
  </Link>
);

export const metadata = {
  title: "Contact | Wayko Infosec",
  description:
    "Get in touch with Wayko via email or connect on LinkedIn and Twitter.",
};

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/franck-chevalier-wayko/",
    description: "Actualités pro & prise de contact rapide",
    icon: LinkedInIcon,
    accent: "text-fuchsia-500",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/wayko_infosec",
    description: "Veille cybersécurité, threads & quick notes",
    icon: TwitterIcon,
    accent: "text-sky-500",
  },
] as const;

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-white text-neutral-900 transition-colors duration-300 dark:bg-black dark:text-neutral-100">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-6 py-16 sm:px-8 lg:py-20">
        <header className="space-y-5">
          <p className="inline-flex items-center gap-2 text-xl font-semibold uppercase tracking-[0.35em] text-fuchsia-700/70 dark:text-fuchsia-300/70">
            Contact
          </p>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-[2.7rem] text-fuchsia-700/70">
              Discutons cybersécurité.
            </h1>

          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
            Canal privilégié
          </h2>
          <EmailLink />
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
            Réseaux
          </h2>
          <div className="rounded-3xl border border-neutral-200/80 bg-white/70 p-1.5 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70">
            <ul className="space-y-1">
              {socials.map(({ label, href, description, icon: Icon, accent }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition hover:bg-fuchsia-50/80 dark:hover:bg-fuchsia-500/10"
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100/90 text-base shadow-sm transition group-hover:scale-105 ${accent} dark:bg-neutral-800`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-semibold text-neutral-900 transition group-hover:text-fuchsia-700 dark:text-neutral-50 dark:group-hover:text-fuchsia-200">
                        {label}
                      </span>
                      <span className="text-xs text-neutral-500 transition group-hover:text-neutral-600 dark:text-neutral-400 dark:group-hover:text-neutral-300">
                        {description}
                      </span>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wide text-neutral-400 transition group-hover:text-fuchsia-500 dark:text-neutral-600 dark:group-hover:text-fuchsia-200">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
