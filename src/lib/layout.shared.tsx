import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/WaykoDev',
    nav: {
      title: (
        <>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Logo"
          >
            <circle cx={12} cy={12} r={12} fill="currentColor" />
          </svg>
          Wayko
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [      
      {
        type: 'menu',
        text: 'Blog',
        items: [
          {
            text: 'Dream, share and chill',
            description: 'Learn to use Fumadocs',
            url: '/dreams',
          },
          {
            text: 'iconv: Set the Charset to RCE',
            description: 'Learn to use Fumadocs',
            url: '/iconv-set-the-charset-to-rce',
          },
          {
            text: 'Dream, share and chill',
            description: 'Learn to use Fumadocs',
            url: '/dreams',
          },
          {
            text: 'iconv: Set the Charset to RCE',
            description: 'Learn to use Fumadocs',
            url: '/iconv-set-the-charset-to-rce',
          },
          {
            text: 'Dream, share and chill',
            description: 'Learn to use Fumadocs',
            url: '/dreams',
          },
          {
            text: 'iconv: Set the Charset to RCE',
            description: 'Learn to use Fumadocs',
            url: '/iconv-set-the-charset-to-rce',
          },
        ],
      },
      {
        text: 'About',
        url: '/about',
        active: 'nested-url',
      },
      {
        text: 'Contact',
        url: '/contact',
        active: 'nested-url',
      },
    ],
  };
}