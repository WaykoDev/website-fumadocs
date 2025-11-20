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
   * 🎯 Clean Float + Glow Effect
   *
   * Simple and reliable:
   * - Upward float (-10px)
   * - Soft glow shadow
   * - Gentle scale (1.08x)
   * - No color changes
   * - Localized (90px radius)
   */
  useEffect(() => {
    if (!isAnimationEnabled || !titleRef.current) return;

    const titleElement = titleRef.current;
    const letterElements = titleElement.querySelectorAll('span[data-letter-index]');

    if (letterElements.length === 0) return;

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

        const effectRadius = 90;

        if (distance > effectRadius) {
          gsap.to(letter, {
            duration: 0.4,
            ease: 'power2.out',
            y: 0,
            scale: 1,
            filter: 'brightness(1)',
            overwrite: 'auto',
          });
          return;
        }

        const proximity = 1 - distance / effectRadius;
        const intensity = Math.pow(proximity, 1.5);

        const floatY = -10 * intensity;
        const scale = 1 + 0.08 * intensity;
        const brightness = 1 + 0.3 * intensity;

        gsap.to(letter, {
          duration: 0.3,
          ease: 'power2.out',
          y: floatY,
          scale: scale,
          filter: `brightness(${brightness})`,
          overwrite: 'auto',
        });
      });
    };

    const handleMouseLeave = () => {
      gsap.to(letterElements, {
        duration: 0.5,
        ease: 'power2.out',
        y: 0,
        scale: 1,
        filter: 'brightness(1)',
        overwrite: 'auto',
      });
    };

    titleElement.addEventListener('mousemove', handleMouseMove);
    titleElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
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
                className="inline-block relative"
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
