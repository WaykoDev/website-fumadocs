"use client";

import { useState, useEffect, useRef } from "react";
import StarfieldBackground from "@/components/StarfieldBackground";

// Typing effect hook
function useTypingEffect(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
}

// Scroll reveal hook
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optionally unobserve after first trigger
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05, // Trigger when 5% of element is visible
        rootMargin: "150px 0px 0px 0px", // Start animation 150px before element enters viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

export default function AboutPage() {
  const taglineText = 'Be part of the solution, not the pollution';
  const { displayedText, isComplete } = useTypingEffect(taglineText, 40);

  const section1 = useScrollReveal();
  const section2 = useScrollReveal();
  const section3 = useScrollReveal();
  const section4 = useScrollReveal();
  const section5 = useScrollReveal();

  return (
    <>
      <StarfieldBackground />

      <style jsx>{`
        @keyframes glitch-1 {
          0% { clip-path: inset(40% 0 61% 0); }
          20% { clip-path: inset(92% 0 1% 0); }
          40% { clip-path: inset(43% 0 1% 0); }
          60% { clip-path: inset(25% 0 58% 0); }
          80% { clip-path: inset(54% 0 7% 0); }
          100% { clip-path: inset(58% 0 43% 0); }
        }

        @keyframes glitch-2 {
          0% { clip-path: inset(25% 0 58% 0); }
          20% { clip-path: inset(54% 0 7% 0); }
          40% { clip-path: inset(58% 0 43% 0); }
          60% { clip-path: inset(40% 0 61% 0); }
          80% { clip-path: inset(92% 0 1% 0); }
          100% { clip-path: inset(43% 0 1% 0); }
        }

        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          10% { transform: skew(-2deg); }
          20% { transform: skew(2deg); }
          30% { transform: skew(-1deg); }
          40% { transform: skew(1deg); }
          50% { transform: skew(0deg); }
          60% { transform: skew(2deg); }
          70% { transform: skew(-2deg); }
          80% { transform: skew(1deg); }
          90% { transform: skew(-1deg); }
          100% { transform: skew(0deg); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glitch-effect {
          cursor: pointer;
          position: relative;
          display: inline-block;
        }

        .glitch-effect::before,
        .glitch-effect::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .glitch-effect::before {
          color: #ff00ff;
          z-index: -1;
        }

        .glitch-effect::after {
          color: #00ffff;
          z-index: -2;
        }

        .glitch-effect:hover {
          animation: glitch-skew 0.5s ease-in-out;
        }

        .glitch-effect:hover::before {
          opacity: 0.8;
          animation: glitch-1 0.5s infinite;
          transform: translate(-2px, 0);
        }

        .glitch-effect:hover::after {
          opacity: 0.8;
          animation: glitch-2 0.5s infinite;
          transform: translate(2px, 0);
        }

        .gradient-text {
          background: linear-gradient(
            90deg,
            #a78bfa 0%,
            #ec4899 50%,
            #a78bfa 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
        }

        .scroll-reveal.visible {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .scroll-reveal.visible.delay-1 {
          animation-delay: 0.1s;
        }

        .scroll-reveal.visible.delay-2 {
          animation-delay: 0.2s;
        }

        .scroll-reveal.visible.delay-3 {
          animation-delay: 0.3s;
        }

        .scroll-reveal.visible.delay-4 {
          animation-delay: 0.4s;
        }

        .scroll-reveal.visible.delay-5 {
          animation-delay: 0.5s;
        }

        .badge-hover {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }

        .badge-hover::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 9999px;
          padding: 1px;
          background: linear-gradient(135deg,
            rgba(91, 33, 182, 0.6),
            rgba(124, 58, 237, 0.8),
            rgba(91, 33, 182, 0.6)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .badge-hover::after {
          content: '✓';
          position: absolute;
          top: -8px;
          right: -8px;
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #5b21b6, #7c3aed);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: #fff;
          font-weight: bold;
          opacity: 0;
          transform: scale(0) rotate(-180deg);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 4px 12px rgba(91, 33, 182, 0.4);
        }

        .badge-hover:hover {
          transform: translateY(-8px) scale(1.3);
          box-shadow: 0 20px 40px -10px rgba(91, 33, 182, 0.5),
                      0 0 0 2px rgba(124, 58, 237, 0.3),
                      0 0 25px rgba(124, 58, 237, 0.2);
          background: linear-gradient(135deg, rgba(91, 33, 182, 0.15), rgba(124, 58, 237, 0.15));
          border: 1px solid rgba(124, 58, 237, 0.4);
          z-index: 10;
        }

        .badge-hover:hover::before {
          opacity: 1;
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .badge-hover:hover::after {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            opacity: 0.7;
            filter: brightness(1.3);
          }
        }

        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: currentColor;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .neuro-window {
          background: transparent !important;
          border-radius: 20px;
          padding: 28px 32px;
          box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.2),
                      -12px -12px 24px rgba(255, 255, 255, 0.025),
                      inset 3px 3px 6px rgba(124, 58, 237, 0.08);
          border: 1px solid rgba(124, 58, 237, 0.4);
        }

        .neuro-text {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
          font-size: 15px;
          line-height: 1.7;
          color: #d4d4d4;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          font-style: italic;
          letter-spacing: 0.02em;
        }

        @media (min-width: 640px) {
          .neuro-text {
            font-size: 16px;
          }
        }

        .role-link {
          position: relative;
          font-weight: 600;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          padding-bottom: 2px;
        }

        .role-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #5b21b6, #7c3aed);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 1px;
        }

        .role-link:hover {
          color: hsl(var(--foreground));
        }

        .role-link:hover::after {
          width: 100%;
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center px-4 py-16 sm:px-6 md:px-8">
        <main className="max-w-3xl w-full space-y-12">
          {/* Header Section */}
          <section
            ref={section1.ref as any}
            className={`space-y-4 text-center scroll-reveal ${section1.isVisible ? 'visible delay-1' : ''}`}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight glitch-effect"
              data-text="Franck Chevalier"
            >
              Franck Chevalier
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground">
              <span>
                Pentester at{" "}
                <a
                  href="https://www.lexfo.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="role-link"
                >
                  Lexfo
                </a>
              </span>
              <span className="hidden sm:inline opacity-60">•</span>
              <span>
                Student at{" "}
                <a
                  href="https://ecole2600.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="role-link"
                >
                  Ecole2600
                </a>
              </span>
            </div>
          </section>

          {/* Tagline with Typing Effect */}
          <section
            ref={section2.ref as any}
            className={`flex justify-center scroll-reveal ${section2.isVisible ? 'visible delay-2' : ''}`}
          >
            <div className="neuro-window max-w-2xl w-full">
              <div className="neuro-text">
                {displayedText}
                {!isComplete && <span className="typing-cursor" />}
              </div>
            </div>
          </section>

          {/* Bio Section */}
          <section
            ref={section3.ref as any}
            className={`space-y-6 scroll-reveal ${section3.isVisible ? 'visible delay-3' : ''}`}
          >
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
          <section
            ref={section4.ref as any}
            className={`space-y-6 scroll-reveal ${section4.isVisible ? 'visible delay-4' : ''}`}
          >
            <div className="h-px bg-border w-24 mx-auto" />

            <div className="space-y-4 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold">Certifications</h2>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {["OSCP", "OSWA", "KLCP", "CBBH"].map((cert, index) => (
                  <span
                    key={cert}
                    className="badge-hover px-4 py-2 rounded-full bg-accent/50 text-sm sm:text-base font-medium cursor-pointer"
                    style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* CTF Teams */}
          <section
            ref={section5.ref as any}
            className={`space-y-6 pb-8 scroll-reveal ${section5.isVisible ? 'visible delay-5' : ''}`}
          >
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