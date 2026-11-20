CREATE TABLE reading_progress (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book TEXT NOT NULL,
  chapter TEXT NOT NULL,
  resume REAL NOT NULL CHECK(resume BETWEEN 0 AND 100),
  furthest REAL NOT NULL CHECK(furthest BETWEEN resume AND 100),
  observed_at INTEGER NOT NULL,
  last_read_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, book, chapter)
);

CREATE INDEX reading_progress_recent ON reading_progress(user_id, last_read_at DESC);

CREATE TABLE reading_highlights (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book TEXT NOT NULL,
  chapter TEXT NOT NULL,
  id TEXT NOT NULL,
  view TEXT NOT NULL CHECK(view IN ('zh','en','translation')),
  start INTEGER NOT NULL CHECK(start >= 0),
  quote TEXT NOT NULL,
  prefix TEXT NOT NULL,
  suffix TEXT NOT NULL,
  PRIMARY KEY (user_id, book, chapter, id)
);
