CREATE TABLE submissions (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 request_id TEXT NOT NULL,
 title TEXT NOT NULL CHECK(length(title) BETWEEN 1 AND 100),
 summary TEXT NOT NULL DEFAULT '',
 message TEXT NOT NULL DEFAULT '',
 url TEXT NOT NULL DEFAULT '',
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','adopted','declined')),
 note TEXT NOT NULL DEFAULT '',
 created_at INTEGER NOT NULL DEFAULT (unixepoch()),
 UNIQUE(user_id,request_id)
);
CREATE INDEX submissions_author_id ON submissions(user_id,id DESC);
CREATE INDEX submissions_author_status ON submissions(user_id,status);
CREATE INDEX submissions_status_id ON submissions(status,id DESC);
