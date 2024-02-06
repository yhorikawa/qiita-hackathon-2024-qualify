-- name: createUsers :exec
INSERT INTO Users (uuid) VALUES (@uuid);

-- name: getUser :one
SELECT * FROM Users WHERE uuid = @uuid;
