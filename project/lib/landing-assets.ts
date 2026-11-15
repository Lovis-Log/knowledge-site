// Deliberately public marketing exports. Never expose the private covers directory.
export const landingAssets = {
  shelf: "/images/landing/preview-shelf-v2.webp",
  contents: "/images/landing/preview-contents-v2.webp",
  reader: "/images/landing/preview-reader-v2.webp",
  bookMath: "/images/landing/cover-book-math-v2.webp",
  bookNews: "/images/landing/cover-book-news-v2.webp",
  bookCpp: "/images/landing/cover-book-cpp-v2.webp",
  book: "/images/landing/open-book-v2.webp",
  mobile: "/images/landing/hero-mobile-v3.webp",
  resume: "/images/landing/hero-resume-v3.webp",
  desktop: "/images/landing/hero-desktop-v3.webp",
} as const;

export const publicLandingAssets: readonly string[] = Object.values(landingAssets);
