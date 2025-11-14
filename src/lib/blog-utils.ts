export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getExcerpt(content: string, maxLength = 150): string {
  const stripped = content.replace(/[#*`\[\]]/g, '').trim();
  if (stripped.length <= maxLength) return stripped;
  return stripped.slice(0, maxLength).trim() + '...';
}

export const tagColors: Record<string, string> = {
  'pentest': 'bg-red-500/10 text-red-500 border-red-500/20',
  'ctf': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'vulnerability': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'web': 'bg-green-500/10 text-green-500 border-green-500/20',
  'network': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  'crypto': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'reverse': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  'writeup': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  'tutorial': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'default': 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

export function getTagColor(tag: string): string {
  return tagColors[tag.toLowerCase()] || tagColors.default;
}
