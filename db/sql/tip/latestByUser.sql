SELECT tip.*, users.name, business.name, business.city
FROM tip
    INNER JOIN users on tip.user_id = users.id
    INNER JOIN business on tip.business = business.id
WHERE tip.user_id = ${userID}
ORDER BY tip.date DESC
LIMIT 1
