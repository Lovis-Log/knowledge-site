ALTER TABLE reading_highlights ADD COLUMN anchor_format INTEGER NOT NULL DEFAULT 0 CHECK(anchor_format IN (0, 1));

CREATE TABLE donation_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id TEXT NOT NULL UNIQUE,
  donor TEXT NOT NULL CHECK(length(donor) BETWEEN 1 AND 100),
  amount_fen INTEGER NOT NULL CHECK(amount_fen BETWEEN 1 AND 999999999),
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX submissions_source_id ON submissions(source, id DESC);
