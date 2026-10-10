CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT NOT NULL,
  mime TEXT NOT NULL,
  size INTEGER NOT NULL,
  sourceUrl TEXT NOT NULL,
  path TEXT NOT NULL,
  createdAt INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_media_name
ON media(name);

CREATE INDEX IF NOT EXISTS idx_media_type
ON media(type);
