import type { CollectionEntry } from 'astro:content';

function getTodayUTCMidnight(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export function splitEvents(entries: CollectionEntry<'events'>[]) {
  const today = getTodayUTCMidnight();

  const upcoming = entries
    .filter((entry) => entry.data.date.getTime() >= today.getTime())
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());

  const past = entries
    .filter((entry) => entry.data.date.getTime() < today.getTime())
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return { upcoming, past };
}
