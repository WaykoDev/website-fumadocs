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
   * Setup GSAP-powered interactive lighting and shadow animations
   *
   * Animation features:
   * - Dynamic shadows that move opposite to cursor position (creates 3D depth illusion)
   * - Proximity-based glow effect that "illuminates" letters near the cursor
   * - Color shifting based on distance (violet hue with variable saturation/lightness)
   * - Subtle scale effect for enhanced depth perception
   * - Smooth transitions using power3.out and expo.out easing
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
     * Mouse move: Calculate light position and animate shadows per letter
     *
     * Algorithm:
     * 1. Get mouse position relative to title container
     * 2. For each letter:
     *    - Calculate distance from mouse to letter center
     *    - Calculate shadow direction (opposite to mouse, like a light source)
     *    - Calculate glow intensity (inverse distance, max at 200px)
     *    - Apply GSAP animation with dynamic text-shadow and color
     */
    const handleMouseMove = (e: MouseEvent) => {
      const titleRect = titleElement.getBoundingClientRect();

      // Calculate mouse position relative to title element
      const mouseX = e.clientX - titleRect.left;
      const mouseY = e.clientY - titleRect.top;

      // Animate each letter individually based on proximity to cursor
      letterElements.forEach((letter) => {
        const letterRect = letter.getBoundingClientRect();
        const letterCenterX = letterRect.left + letterRect.width / 2 - titleRect.left;
        const letterCenterY = letterRect.top + letterRect.height / 2 - titleRect.top;

        // Vector from letter to mouse
        const deltaX = mouseX - letterCenterX;
        const deltaY = mouseY - letterCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Shadow offset calculation: opposite to light source (mouse)
        // Shadow moves away from cursor, creating realistic depth/relief
        const maxShadowDistance = 15; // Max shadow distance in pixels
        const shadowIntensity = Math.min(1, 300 / Math.max(distance, 1)); // Stronger when close
        const shadowX = (-deltaX / distance) * shadowIntensity * maxShadowDistance;
        const shadowY = (-deltaY / distance) * shadowIntensity * maxShadowDistance;

        // Spotlight/glow intensity: sharp falloff like a real lamp
        const maxGlowDistance = 100; // Spotlight radius (tighter)
        const glowIntensity = Math.max(0, Math.pow(1 - distance / maxGlowDistance, 2.5)); // Sharper falloff

        // GSAP animation: smooth transition with power3.out easing
        gsap.to(letter, {
          duration: 0.15,
          ease: 'power3.out',
          textShadow: `
            ${shadowX}px ${shadowY}px ${6 + shadowIntensity * 4}px rgba(0, 0, 0, ${0.4 + shadowIntensity * 0.3}),
            ${shadowX * 0.5}px ${shadowY * 0.5}px ${3}px rgba(0, 0, 0, ${0.2 + shadowIntensity * 0.2}),
            0 0 ${20 + glowIntensity * 40}px rgba(139, 92, 246, ${glowIntensity * 0.8}),
            0 0 ${10 + glowIntensity * 20}px rgba(236, 72, 153, ${glowIntensity * 0.4})
          `,
          // Don't change text color - only add glow effect
          filter: `brightness(${1 + glowIntensity * 0.3})`,
        });
      });
    };

    /**
     * Mouse leave: Return to neutral state
     * Uses slower expo.out easing for a gentle "fade out" effect
     */
    const handleMouseLeave = () => {
      gsap.to(letterElements, {
        duration: 0.6,
        ease: 'expo.out',
        textShadow: 'none',
        filter: 'brightness(1)',
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
