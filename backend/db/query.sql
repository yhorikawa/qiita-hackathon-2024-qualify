-- name: createUsers :exec
INSERT INTO Users (id, user_name) VALUES (@id, @user_name);

-- name: getUser :one
SELECT * FROM Users WHERE user_name = @user_name;

-- name: findMostFrequentCategory :one
SELECT
  category,
  COUNT(category) AS count
FROM
  Messages
WHERE
  user_id = @user_id
GROUP BY
  category
ORDER BY
  count DESC
LIMIT 1;

-- name: getCategorizedMessages :many
SELECT
  *
FROM
  Messages
WHERE
  user_id != @user_id
  AND category == @category
ORDER BY
  RANDOM()
LIMIT @limit;

-- name: getRandMessages :many
SELECT
  *
FROM
  Messages
WHERE
  user_id != @user_id
  and id not in (sqlc.slice(ids))
ORDER BY
  RANDOM()
LIMIT @limit;

-- name: getSentMessages :many
SELECT
  *
FROM
  Messages
WHERE
  user_id = @user_id
ORDER BY
  created_at DESC;

-- name: getReplies :many
SELECT
  *
FROM
  Replies
WHERE
  message_id = @message_id;

-- name: createMessage :exec
INSERT INTO Messages (user_id, category, content) VALUES (@user_id, @category, @content);

-- name: createReply :exec
INSERT INTO Replies (message_id, user_id, content) VALUES (@message_id, @user_id, @content);

-- name: getMessage :one
SELECT * FROM Messages WHERE id = @id;
