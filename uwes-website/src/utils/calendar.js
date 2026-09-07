import { createEvent } from 'ics';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatTime12h(time24) {
  if (!time24) return '';
  const [hStr, mStr] = time24.split(':');
  let h = parseInt(hStr, 10);
  const period = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${mStr} ${period}`;
}

export function formatTimeRange(startTime, endTime) {
  if (!startTime) return '';
  if (!endTime) return formatTime12h(startTime);
  return `${formatTime12h(startTime)} – ${formatTime12h(endTime)}`;
}

function toISODateString(date) {
  return date.toISOString().slice(0, 10);
}

function toCalendarDateTime(date, time) {
  return `${toISODateString(date).replace(/-/g, '')}T${time.replace(':', '')}00`;
}

export function buildGoogleCalendarUrl({ title, description, location, date, startTime, endTime }) {
  const start = toCalendarDateTime(date, startTime);
  const end = toCalendarDateTime(date, endTime || startTime);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details: description || '',
    location: location || '',
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

function toICSDateArray(date, time) {
  const [year, month, day] = toISODateString(date).split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  return [year, month, day, hour, minute];
}

export function buildICSContent({ title, description, location, date, startTime, endTime }) {
  const uid = `${slugify(title)}-${toISODateString(date)}@uweconsoc.github.io`;

  const { error, value } = createEvent({
    title,
    description,
    location,
    uid,
    productId: '-//UWES//Events//EN',
    start: toICSDateArray(date, startTime),
    startInputType: 'local',
    startOutputType: 'local',
    end: toICSDateArray(date, endTime || startTime),
    endInputType: 'local',
    endOutputType: 'local',
  });

  if (error) {
    throw new Error(`Failed to build ICS content for event "${title}": ${error.message ?? error}`);
  }

  return value;
}

export function buildICSDataUrl(event) {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(buildICSContent(event))}`;
}

export function buildICSFilename(event) {
  return `${slugify(event.title)}.ics`;
}
