CREATE TABLE content_versions (id TEXT PRIMARY KEY, created_at INTEGER NOT NULL);
CREATE TABLE content_entries (
 version_id TEXT NOT NULL REFERENCES content_versions(id) ON DELETE CASCADE,
 key TEXT NOT NULL, json TEXT NOT NULL, PRIMARY KEY(version_id,key)
);
CREATE TABLE content_current (id INTEGER PRIMARY KEY CHECK(id=1), version_id TEXT NOT NULL REFERENCES content_versions(id));
