-- Account deletion may keep a replied thread root as an anonymized placeholder.
-- The column only marks the row so the API can hide the stored marker text;
-- rows created by an older Worker keep working with the default value.
ALTER TABLE guestbook_entries ADD COLUMN placeholder INTEGER NOT NULL DEFAULT 0 CHECK(placeholder IN (0,1));

-- Optimistic concurrency for submission moderation. Older Workers ignore the
-- column; the trigger below still advances it for their writes during a
-- rolling deployment, so a stale moderation request cannot silently overwrite.
ALTER TABLE submissions ADD COLUMN version INTEGER NOT NULL DEFAULT 0;
CREATE TRIGGER submissions_version AFTER UPDATE ON submissions
WHEN NEW.version = OLD.version
BEGIN
  UPDATE submissions SET version = OLD.version + 1 WHERE id = NEW.id;
END;

-- A review note keeps the account status unchanged and must not sign the
-- member out. Status and password changes still revoke every session.
DROP TRIGGER IF EXISTS revoke_sessions;
CREATE TRIGGER revoke_sessions AFTER UPDATE OF status, password_hash ON users
WHEN OLD.status IS NOT NEW.status OR OLD.password_hash IS NOT NEW.password_hash
BEGIN
  DELETE FROM sessions WHERE user_id = NEW.id;
END;