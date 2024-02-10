-- name: createUsers :exec
INSERT INTO Users (id) VALUES (@id);

-- name: getUser :one
SELECT * FROM Users WHERE id = @id;
