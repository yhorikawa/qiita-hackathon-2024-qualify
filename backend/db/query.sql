-- name: createUsers :exec
INSERT INTO Users (id, user_name) VALUES (@id, @user_name);

-- name: getUser :one
SELECT * FROM Users WHERE user_name = @user_name;

-- name: createMessage :exec
INSERT INTO Messages (user_id, category, content) VALUES (@user_id, @category, @content);

-- name: createReply :exec
INSERT INTO Replies (message_id, user_id, content) VALUES (@message_id, @user_id, @content);

-- name: getMessage :one
SELECT * FROM Messages WHERE id = @id;
