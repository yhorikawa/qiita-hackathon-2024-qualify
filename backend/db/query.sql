-- name: createUsers :exec
INSERT INTO Users (id) VALUES (@id);

-- name: getUser :one
SELECT * FROM Users WHERE id = @id;

-- name: createMessage :exec
INSERT INTO Messages (user_id, category, content) VALUES (@user_id, @category, @content);

-- name: createReply :exec
INSERT INTO Replies (message_id, user_id, content) VALUES (@message_id, @user_id, @content);
