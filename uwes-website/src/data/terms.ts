import type { CollectionEntry } from 'astro:content';

type ContentEntry = CollectionEntry<'articles'> | CollectionEntry<'newsletter'>;

export function getTerm(date: Date | string): string {
  const d = new Date(date);
  const month = d.getUTCMonth() + 1;
  const year = d.getUTCFullYear();

  if (month >= 1 && month <= 4) return `Winter ${year}`;
  if (month >= 5 && month <= 8) return `Spring ${year}`;
  return `Fall ${year}`;
}

export function groupByTerm<T extends ContentEntry>(
  entries: T[],
  dateAccessor: (entry: T) => Date = (entry) => entry.data.date
): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  entries.forEach((entry) => {
    const term = getTerm(dateAccessor(entry));
    if (!groups[term]) groups[term] = [];
    groups[term].push(entry);
  });
  return groups;
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}
