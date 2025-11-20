'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { BlogMeta } from '@/components/blog/BlogMeta';
import { LinkTagBadge } from '@/components/blog/LinkTagBadge';

interface AnimatedBlogHeaderProps {
  title: string;
  description?: string;
  author?: string;
  date: string;
  readingTime: number;
  tags?: string[];
}

export function AnimatedBlogHeader({
  title,
  description,
  author,
  date,
  readingTime,
  tags,
}: AnimatedBlogHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [letters, setLetters] = useState<string[]>([]);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);

  // Split text into letters on mount
  useEffect(() => {
    if (title) {
      // Split title into individual characters, preserving spaces
      setLetters(title.split(''));
    }
  }, [title]);

  /**
   * Check for animation compatibility
   * Disable animations on:
   * - Users with reduced motion preference (accessibility)
   * - Mobile devices (< 1024px width)
   * - Touch devices (performance & different interaction model)
   */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    setIsAnimationEnabled(!prefersReducedMotion && !isMobile && !isTouchDevice);
  }, []);

  /**
   * 🎯 GSAP-powered Localized Shadow Effect
   *
   * A precise, targeted animation:
   * - Only affects letters within 70px of cursor (very localized)
   * - Dynamic shadow projection opposite to cursor position
   * - Triple-layer dark shadows for realistic depth
   * - Letters outside zone are immediately reset (no global effect)
   * - No colored glow or white halo - pure shadow only
   * - Subtle scale effect (max 1.1x)
   * - Ultra-fast reactivity (0.1s duration)
   * - Instant overwrite of previous animations
   */
  useEffect(() => {
    if (!isAnimationEnabled || !titleRef.current) return;

    const titleElement = titleRef.current;
    const letterElements = titleElement.querySelectorAll('span[data-letter-index]');

    if (letterElements.length === 0) return;

    /**
     * Mouse enter: Initialize animation state
     */
    const handleMouseEnter = () => {
      gsap.to(letterElements, {
        duration: 0.3,
        ease: 'power3.out',
        opacity: 1,
      });
    };

    /**
     * 🎯 LOCALIZED SHADOW EFFECT
     *
     * A precise, localized animation:
     * - Shadow only on letters very close to cursor
     * - Shadow direction opposite to cursor (realistic light source)
     * - Small radius - affects only nearby letters
     * - No glow, no white halo - pure shadow effect
     * - Instant reactivity
     */
    const handleMouseMove = (e: MouseEvent) => {
      const titleRect = titleElement.getBoundingClientRect();
      const mouseX = e.clientX - titleRect.left;
      const mouseY = e.clientY - titleRect.top;

      letterElements.forEach((letter) => {
        const letterRect = letter.getBoundingClientRect();
        const letterCenterX = letterRect.left + letterRect.width / 2 - titleRect.left;
        const letterCenterY = letterRect.top + letterRect.height / 2 - titleRect.top;

        const deltaX = mouseX - letterCenterX;
        const deltaY = mouseY - letterCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Very small zone - only affects letters within 70px
        const effectRadius = 70;

        // Letter is outside effect zone - reset it
        if (distance > effectRadius) {
          gsap.to(letter, {
            duration: 0.2,
            ease: 'power1.out',
            textShadow: 'none',
            overwrite: 'auto',
          });
          return;
        }

        // Calculate intensity (only for letters inside zone)
        const proximity = 1 - distance / effectRadius;
        const intensity = Math.pow(proximity, 2);

        // Shadow direction: opposite to cursor (light source from cursor)
        const shadowDistance = 45; // Much bigger shadow distance
        const shadowIntensity = intensity;
        const shadowX = (-deltaX / distance) * shadowIntensity * shadowDistance;
        const shadowY = (-deltaY / distance) * shadowIntensity * shadowDistance;

        // Very strong dark shadows with heavy blur - no scale movement
        gsap.to(letter, {
          duration: 0.1,
          ease: 'power1.out',
          textShadow: `
            ${shadowX * 2.5}px ${shadowY * 2.5}px ${18 + intensity * 15}px rgba(0, 0, 0, ${0.6 + intensity * 0.4}),
            ${shadowX * 1.5}px ${shadowY * 1.5}px ${10 + intensity * 8}px rgba(0, 0, 0, ${0.7 + intensity * 0.3}),
            ${shadowX}px ${shadowY}px ${5 + intensity * 4}px rgba(0, 0, 0, ${0.6 + intensity * 0.4}),
            ${shadowX * 0.5}px ${shadowY * 0.5}px 2px rgba(0, 0, 0, ${0.5 + intensity * 0.3})
          `,
          overwrite: 'auto',
        });
      });
    };

    /**
     * Mouse leave: Immediate return to neutral state
     */
    const handleMouseLeave = () => {
      gsap.to(letterElements, {
        duration: 0.15,
        ease: 'power1.out',
        textShadow: 'none',
        overwrite: 'auto',
      });
    };

    // Attach event listeners
    titleElement.addEventListener('mouseenter', handleMouseEnter);
    titleElement.addEventListener('mousemove', handleMouseMove);
    titleElement.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      titleElement.removeEventListener('mouseenter', handleMouseEnter);
      titleElement.removeEventListener('mousemove', handleMouseMove);
      titleElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isAnimationEnabled, letters]);

  return (
    <header
      ref={headerRef}
      className="relative w-full py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 mb-6 sm:mb-8 bg-gradient-to-br from-violet-500/10 via-pink-500/10 to-transparent border-b border-violet-500/20"
    >
      <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        <h1
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight break-words"
          style={{
            cursor: isAnimationEnabled ? 'default' : 'auto',
            userSelect: 'none',
          }}
        >
          {letters.length > 0 ? (
            letters.map((letter, index) => (
              <span
                key={index}
                data-letter-index={index}
                className="inline-block"
                style={{
                  // Preserve spaces
                  ...(letter === ' ' && { width: '0.25em' }),
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))
          ) : (
            title
          )}
        </h1>
        {description && (
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
        <div className="pt-2">
          <BlogMeta author={author} date={date} readingTime={readingTime} />
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <LinkTagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
