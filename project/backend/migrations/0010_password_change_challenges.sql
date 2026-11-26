CREATE TABLE password_change_challenges (
  session_hash TEXT PRIMARY KEY REFERENCES sessions(token_hash) ON DELETE CASCADE,
  challenge_hash TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);
