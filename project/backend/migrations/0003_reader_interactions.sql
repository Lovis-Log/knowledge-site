CREATE TABLE guestbook_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL CHECK(length(message) BETWEEN 1 AND 1000),
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  hidden INTEGER NOT NULL DEFAULT 0 CHECK(hidden IN (0, 1))
);
CREATE INDEX guestbook_visibility_id ON guestbook_entries(hidden, id DESC);
CREATE INDEX guestbook_author ON guestbook_entries(user_id);

CREATE TABLE favorites (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book TEXT NOT NULL,
  chapter TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (user_id, book, chapter)
);
CREATE INDEX favorites_recent ON favorites(user_id, created_at DESC);
