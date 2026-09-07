const coverModules = import.meta.glob('/src/assets/articles/covers/*.jpg', { eager: true });

export function resolveArticleCover(slug) {
  const entry = Object.entries(coverModules).find(([path]) => path.endsWith(`/${slug}-cover.jpg`));
  return entry ? entry[1].default : null;
}
