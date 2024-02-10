// Code generated by sqlc-gen-ts-d1. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
//   sqlc-gen-ts-d1 v0.0.0-a@5663d287bfb2297a3d62286a1c59e21b42a39884f252829ea86d502fcebe94ef

import { D1Database, D1PreparedStatement, D1Result } from "@cloudflare/workers-types/experimental"

type Query<T> = {
  then(onFulfilled?: (value: T) => void, onRejected?: (reason?: any) => void): void;
  batch(): D1PreparedStatement;
}
const createUsersQuery = `-- name: createUsers :exec
INSERT INTO Users (id) VALUES (?1)`;

export type createUsersParams = {
  id: string;
};

export function createUsers(
  d1: D1Database,
  args: createUsersParams
): Query<D1Result> {
  const ps = d1
    .prepare(createUsersQuery)
    .bind(args.id);
  return {
    then(onFulfilled?: (value: D1Result) => void, onRejected?: (reason?: any) => void) {
      ps.run()
        .then(onFulfilled).catch(onRejected);
    },
    batch() { return ps; },
  }
}

const getUserQuery = `-- name: getUser :one
SELECT id, created_at, updated_at FROM Users WHERE id = ?1`;

export type getUserParams = {
  id: string;
};

export type getUserRow = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type RawgetUserRow = {
  id: string;
  created_at: string;
  updated_at: string;
};

export function getUser(
  d1: D1Database,
  args: getUserParams
): Query<getUserRow | null> {
  const ps = d1
    .prepare(getUserQuery)
    .bind(args.id);
  return {
    then(onFulfilled?: (value: getUserRow | null) => void, onRejected?: (reason?: any) => void) {
      ps.first<RawgetUserRow | null>()
        .then((raw: RawgetUserRow | null) => raw ? {
          id: raw.id,
          createdAt: raw.created_at,
          updatedAt: raw.updated_at,
        } : null)
        .then(onFulfilled).catch(onRejected);
    },
    batch() { return ps; },
  }
}

const createMessageQuery = `-- name: createMessage :exec
INSERT INTO Messages (user_id, category, content) VALUES (?1, ?2, ?3)`;

export type createMessageParams = {
  userId: string;
  category: string;
  content: string;
};

export function createMessage(
  d1: D1Database,
  args: createMessageParams
): Query<D1Result> {
  const ps = d1
    .prepare(createMessageQuery)
    .bind(args.userId, args.category, args.content);
  return {
    then(onFulfilled?: (value: D1Result) => void, onRejected?: (reason?: any) => void) {
      ps.run()
        .then(onFulfilled).catch(onRejected);
    },
    batch() { return ps; },
  }
}

const createReplyQuery = `-- name: createReply :exec
INSERT INTO Replies (message_id, user_id, content) VALUES (?1, ?2, ?3)`;

export type createReplyParams = {
  messageId: number;
  userId: string;
  content: string;
};

export function createReply(
  d1: D1Database,
  args: createReplyParams
): Query<D1Result> {
  const ps = d1
    .prepare(createReplyQuery)
    .bind(args.messageId, args.userId, args.content);
  return {
    then(onFulfilled?: (value: D1Result) => void, onRejected?: (reason?: any) => void) {
      ps.run()
        .then(onFulfilled).catch(onRejected);
    },
    batch() { return ps; },
  }
}

const getMessageQuery = `-- name: getMessage :one
SELECT id, user_id, category, content, created_at, updated_at FROM Messages WHERE id = ?1`;

export type getMessageParams = {
  id: number;
};

export type getMessageRow = {
  id: number;
  userId: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type RawgetMessageRow = {
  id: number;
  user_id: string;
  category: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export function getMessage(
  d1: D1Database,
  args: getMessageParams
): Query<getMessageRow | null> {
  const ps = d1
    .prepare(getMessageQuery)
    .bind(args.id);
  return {
    then(onFulfilled?: (value: getMessageRow | null) => void, onRejected?: (reason?: any) => void) {
      ps.first<RawgetMessageRow | null>()
        .then((raw: RawgetMessageRow | null) => raw ? {
          id: raw.id,
          userId: raw.user_id,
          category: raw.category,
          content: raw.content,
          createdAt: raw.created_at,
          updatedAt: raw.updated_at,
        } : null)
        .then(onFulfilled).catch(onRejected);
    },
    batch() { return ps; },
  }
}

