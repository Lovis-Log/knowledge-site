import type { Book } from '@/content/types';

// Titles arrive through the protected catalog, never a public JavaScript map.
export function bookTitle(book: Pick<Book, 'slug' | 'title' | 'displayTitle'>) {
  return book.displayTitle ?? { zh: book.title, en: book.title };
}
