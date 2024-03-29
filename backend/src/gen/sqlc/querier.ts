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
INSERT INTO Users (id, user_name) VALUES (?1, ?2)`;

export type createUsersParams = {
  id: string;
  userName: string;
};

export function createUsers(
  d1: D1Database,
  args: createUsersParams
): Query<D1Result> {
  const ps = d1
    .prepare(createUsersQuery)
    .bind(args.id, args.userName);
  return {
    then(onFulfilled?: (value: D1Result) => void, onRejected?: (reason?: any) => void) {
      ps.run()
        .then(onFulfilled).catch(onRejected);
    },
    batch() { return ps; },
  }
}

const getUserQuery = `-- name: getUser :one
SELECT id, user_name, created_at, updated_at FROM Users WHERE user_name = ?1`;

export type getUserParams = {
  userName: string;
};

export type getUserRow = {
  id: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
};

type RawgetUserRow = {
  id: string;
  user_name: string;
  created_at: string;
  updated_at: string;
};

export function getUser(
  d1: D1Database,
  args: getUserParams
): Query<getUserRow | null> {
  const ps = d1
    .prepare(getUserQuery)
    .bind(args.userName);
  return {
    then(onFulfilled?: (value: getUserRow | null) => void, onRejected?: (reason?: any) => void) {
      ps.first<RawgetUserRow | null>()
        .then((raw: RawgetUserRow | null) => raw ? {
          id: raw.id,
          userName: raw.user_name,
          createdAt: raw.created_at,
          updatedAt: raw.updated_at,
        } : null)
        .then(onFulfilled).catch(onRejected);
    },
    batch() { return ps; },
  }
}

const findMostFrequentCategoryQuery = `-- name: findMostFrequentCategory :one
SELECT
  category,
  COUNT(category) AS count
FROM
  Messages
WHERE
  user_id = ?1
GROUP BY
  category
ORDER BY
  count DESC
LIMIT 1`;

export type findMostFrequentCategoryParams = {
  userId: string;
};

export type findMostFrequentCategoryRow = {
  category: string;
  count: number;
};

export function findMostFrequentCategory(
  d1: D1Database,
  args: findMostFrequentCategoryParams
): Query<findMostFrequentCategoryRow | null> {
  const ps = d1
    .prepare(findMostFrequentCategoryQuery)
    .bind(args.userId);
  return {
    then(onFulfilled?: (value: findMostFrequentCategoryRow | null) => void, onRejected?: (reason?: any) => void) {
      ps.first<findMostFrequentCategoryRow | null>()
        .then(onFulfilled).catch(onRejected);
    },
    batch() { return ps; },
  }
}

const getCategorizedMessagesQuery = `-- name: getCategorizedMessages :many
SELECT
  id, user_id, category, content, created_at, updated_at
FROM
  Messages
WHERE
  user_id != ?1
  AND category == ?2
ORDER BY
  RANDOM()
LIMIT ?3`;

export type getCategorizedMessagesParams = {
  userId: string;
  category: string;
  limit: number;
};

export type getCategorizedMessagesRow = {
  id: number;
  userId: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type RawgetCategorizedMessagesRow = {
  id: number;
  user_id: string;
  category: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export function getCategorizedMessages(
  d1: D1Database,
  args: getCategorizedMessagesParams
): Query<D1Result<getCategorizedMessagesRow>> {
  const ps = d1
    .prepare(getCategorizedMessagesQuery)
    .bind(args.userId, args.category, args.limit);
  return {
    then(onFulfilled?: (value: D1Result<getCategorizedMessagesRow>) => void, onRejected?: (reason?: any) => void) {
      ps.all<RawgetCategorizedMessagesRow>()
        .then((r: D1Result<RawgetCategorizedMessagesRow>) => { return {
          ...r,
          results: r.results.map((raw: RawgetCategorizedMessagesRow) => { return {
            id: raw.id,
            userId: raw.user_id,
            category: raw.category,
            content: raw.content,
            createdAt: raw.created_at,
            updatedAt: raw.updated_at,
          }}),
        }})
        .then(onFulfilled).catch(onRejected);
    },
    batch() { return ps; },
  }
}

const getRandMessagesQuery = `-- name: getRandMessages :many
SELECT
  id, user_id, category, content, created_at, updated_at
FROM
  Messages
WHERE
  user_id != ?1
  and id not in (/*SLICE:ids*/?)
ORDER BY
  RANDOM()
LIMIT ?3`;

export type getRandMessagesParams = {
  userId: string;
  ids: number[];
  limit: number;
};

export type getRandMessagesRow = {
  id: number;
  userId: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type RawgetRandMessagesRow = {
  id: number;
  user_id: string;
  category: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export function getRandMessages(
  d1: D1Database,
  args: getRandMessagesParams
): Query<D1Result<getRandMessagesRow>> {
  let query = getRandMessagesQuery;
  const params: any[] = [args.userId, args.ids[0], args.limit];
  query = query.replace("(/*SLICE:ids*/?)", expandedParam(2, args.ids.length, params.length));
  params.push(...args.ids.slice(1));
  const ps = d1
    .prepare(query)
    .bind(...params);
  return {
    then(onFulfilled?: (value: D1Result<getRandMessagesRow>) => void, onRejected?: (reason?: any) => void) {
      ps.all<RawgetRandMessagesRow>()
        .then((r: D1Result<RawgetRandMessagesRow>) => { return {
          ...r,
          results: r.results.map((raw: RawgetRandMessagesRow) => { return {
            id: raw.id,
            userId: raw.user_id,
            category: raw.category,
            content: raw.content,
            createdAt: raw.created_at,
            updatedAt: raw.updated_at,
          }}),
        }})
        .then(onFulfilled).catch(onRejected);
    },
    batch() { return ps; },
  }
}

const getSentMessagesQuery = `-- name: getSentMessages :many
SELECT
  id, user_id, category, content, created_at, updated_at
FROM
  Messages
WHERE
  user_id = ?1
ORDER BY
  created_at DESC`;

export type getSentMessagesParams = {
  userId: string;
};

export type getSentMessagesRow = {
  id: number;
  userId: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type RawgetSentMessagesRow = {
  id: number;
  user_id: string;
  category: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export function getSentMessages(
  d1: D1Database,
  args: getSentMessagesParams
): Query<D1Result<getSentMessagesRow>> {
  const ps = d1
    .prepare(getSentMessagesQuery)
    .bind(args.userId);
  return {
    then(onFulfilled?: (value: D1Result<getSentMessagesRow>) => void, onRejected?: (reason?: any) => void) {
      ps.all<RawgetSentMessagesRow>()
        .then((r: D1Result<RawgetSentMessagesRow>) => { return {
          ...r,
          results: r.results.map((raw: RawgetSentMessagesRow) => { return {
            id: raw.id,
            userId: raw.user_id,
            category: raw.category,
            content: raw.content,
            createdAt: raw.created_at,
            updatedAt: raw.updated_at,
          }}),
        }})
        .then(onFulfilled).catch(onRejected);
    },
    batch() { return ps; },
  }
}

const getRepliesQuery = `-- name: getReplies :many
SELECT
  id, message_id, user_id, content, created_at, updated_at
FROM
  Replies
WHERE
  message_id = ?1`;

export type getRepliesParams = {
  messageId: number;
};

export type getRepliesRow = {
  id: number;
  messageId: number;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type RawgetRepliesRow = {
  id: number;
  message_id: number;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export function getReplies(
  d1: D1Database,
  args: getRepliesParams
): Query<D1Result<getRepliesRow>> {
  const ps = d1
    .prepare(getRepliesQuery)
    .bind(args.messageId);
  return {
    then(onFulfilled?: (value: D1Result<getRepliesRow>) => void, onRejected?: (reason?: any) => void) {
      ps.all<RawgetRepliesRow>()
        .then((r: D1Result<RawgetRepliesRow>) => { return {
          ...r,
          results: r.results.map((raw: RawgetRepliesRow) => { return {
            id: raw.id,
            messageId: raw.message_id,
            userId: raw.user_id,
            content: raw.content,
            createdAt: raw.created_at,
            updatedAt: raw.updated_at,
          }}),
        }})
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

function expandedParam(n: number, len: number, last: number): string {
  const params: number[] = [n];
  for (let i = 1; i < len; i++) {
    params.push(last + i);
  }
  return "(" + params.map((x: number) => "?" + x).join(", ") + ")";
}
