const modules = import.meta.glob("../assets/us/*.{jpg,jpeg,png,webp,avif}", { eager: true, query: "?url", import: "default" });

export const usPhotos = Object.entries(modules)
  .filter(([path]) => !path.endsWith(".gitkeep"))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => ({ id: path, src, alt: `Foto berdua ${index + 1}` }));
