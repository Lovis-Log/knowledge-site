PRAGMA foreign_keys = ON;
CREATE TABLE invites (
 id TEXT PRIMARY KEY, code_hash TEXT NOT NULL UNIQUE, expires_at INTEGER NOT NULL,
 max_uses INTEGER NOT NULL CHECK(max_uses > 0), uses INTEGER NOT NULL DEFAULT 0 CHECK(uses >= 0 AND uses <= max_uses),
 revoked INTEGER NOT NULL DEFAULT 0 CHECK(revoked IN (0,1)), created_by TEXT NOT NULL, created_at INTEGER NOT NULL
);
CREATE TABLE users (
 id TEXT PRIMARY KEY, username TEXT NOT NULL COLLATE NOCASE UNIQUE, password_hash TEXT NOT NULL,
 nickname TEXT NOT NULL, reason TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user','admin')),
 status TEXT NOT NULL CHECK(status IN ('pending','approved','rejected','disabled')),
 invite_id TEXT REFERENCES invites(id), created_at INTEGER NOT NULL, version INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE sessions (
 token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 expires_at INTEGER NOT NULL, created_at INTEGER NOT NULL
);
CREATE INDEX sessions_user ON sessions(user_id);
CREATE TABLE review_logs (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), admin_id TEXT NOT NULL REFERENCES users(id),
 action TEXT NOT NULL, note TEXT NOT NULL, created_at INTEGER NOT NULL
);
CREATE INDEX reviews_user ON review_logs(user_id,created_at);
CREATE INDEX users_status ON users(status,created_at);
CREATE TABLE reset_tokens (
 token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires_at INTEGER NOT NULL,
 used_at INTEGER
);
CREATE INDEX resets_user ON reset_tokens(user_id);
CREATE TABLE rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE TRIGGER validate_invite BEFORE INSERT ON users WHEN NEW.invite_id IS NOT NULL BEGIN
 SELECT CASE WHEN NEW.status != 'approved' OR NOT EXISTS (
  SELECT 1 FROM invites WHERE id=NEW.invite_id AND revoked=0 AND expires_at>unixepoch() AND uses<max_uses
 ) THEN RAISE(ABORT, 'INVITE_UNAVAILABLE') END;
END;
CREATE TRIGGER consume_invite AFTER INSERT ON users WHEN NEW.invite_id IS NOT NULL BEGIN
 UPDATE invites SET uses=uses+1 WHERE id=NEW.invite_id;
END;
CREATE TRIGGER revoke_sessions AFTER UPDATE OF status,password_hash ON users BEGIN
 DELETE FROM sessions WHERE user_id=NEW.id;
END;
