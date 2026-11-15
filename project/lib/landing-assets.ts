// Deliberately public marketing exports. Never expose the private covers directory.
export const landingAssets = {
  shelf: "/images/landing/preview-shelf-v2.webp",
  contents: "/images/landing/preview-contents-v2.webp",
  reader: "/images/landing/preview-reader-v2.webp",
  math: "/images/landing/cover-math-v2.webp",
  agents: "/images/landing/cover-agents-v2.webp",
  cpp: "/images/landing/cover-cpp-v2.webp",
  book: "/images/landing/open-book-v2.webp",
} as const;

export const publicLandingAssets: readonly string[] = Object.values(landingAssets);
