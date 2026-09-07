import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

const contentEntrySchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Research Team'),
    excerpt: z.string(),
    cover: image().optional(),
    coverAlt: z.string().optional(),
  });

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: contentEntrySchema,
});

const newsletter = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/newsletter' }),
  schema: contentEntrySchema,
});

const timeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'must be 24h HH:MM, e.g. 18:00');

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    startTime: timeSchema.optional(),
    endTime: timeSchema.optional(),
    location: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { articles, newsletter, events };
