CREATE TABLE IF NOT EXISTS Users (
  uuid TEXT PRIMARY KEY,
  createdAt TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updatedAt TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);
