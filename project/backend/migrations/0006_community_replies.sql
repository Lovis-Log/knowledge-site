-- One-level guestbook threads. Replies store the thread root and the nickname
-- of the entry they answer; existing rows remain roots with no target.
ALTER TABLE guestbook_entries ADD COLUMN parent_id INTEGER REFERENCES guestbook_entries(id) ON DELETE CASCADE;
ALTER TABLE guestbook_entries ADD COLUMN reply_to_nickname TEXT NOT NULL DEFAULT '';
CREATE INDEX guestbook_replies ON guestbook_entries(parent_id, hidden, id);

-- Private notes can arrive from the donation dialog without payment linkage.
ALTER TABLE submissions ADD COLUMN source TEXT NOT NULL DEFAULT '';