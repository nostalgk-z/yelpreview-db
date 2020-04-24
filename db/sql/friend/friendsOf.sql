SELECT users.*
FROM friend INNER JOIN users on friend.friend = users.id
WHERE friend.user_id = ${userID}