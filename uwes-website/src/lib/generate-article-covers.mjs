import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const PDF_DIR = path.join(ROOT, 'public/articles');
const COVER_DIR = path.join(ROOT, 'src/assets/articles/covers');
const ARTICLES_CONTENT_DIR = path.join(ROOT, 'src/content/articles');

export async function validateArticlePdfs() {
  let entries;
  try {
    entries = await fs.readdir(ARTICLES_CONTENT_DIR, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }

  const slugs = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name.slice(0, -'.md'.length));

  const missing = [];
  for (const slug of slugs) {
    try {
      await fs.access(path.join(PDF_DIR, `${slug}.pdf`));
    } catch {
      missing.push(slug);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing PDF for article(s): ${missing.join(', ')}. ` +
        'Each src/content/articles/<slug>.md needs a matching public/articles/<slug>.pdf.',
    );
  }
}

export async function generateArticleCovers() {
  let entries;
  try {
    entries = await fs.readdir(PDF_DIR, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }

  const pdfFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.pdf'));
  if (pdfFiles.length === 0) return;

  await fs.mkdir(COVER_DIR, { recursive: true });

  const { pdf } = await import('pdf-to-img');

  for (const file of pdfFiles) {
    const slug = file.name.slice(0, -'.pdf'.length);
    const pdfPath = path.join(PDF_DIR, file.name);
    const coverPath = path.join(COVER_DIR, `${slug}-cover.jpg`);

    const [pdfStat, coverStat] = await Promise.all([
      fs.stat(pdfPath),
      fs.stat(coverPath).catch(() => null),
    ]);
    if (coverStat && coverStat.mtimeMs >= pdfStat.mtimeMs) continue;

    const document = await pdf(pdfPath, { format: 'jpg', scale: 2 });
    const firstPage = await document.getPage(1);
    await fs.writeFile(coverPath, firstPage);
  }
}
