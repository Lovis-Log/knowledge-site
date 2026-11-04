-- Run explicitly against the intended environment; never delete audit records.
DELETE FROM sessions WHERE expires_at<=unixepoch();
DELETE FROM reset_tokens WHERE expires_at<=unixepoch() OR used_at IS NOT NULL;
DELETE FROM rate_limits WHERE expires_at<=unixepoch();
