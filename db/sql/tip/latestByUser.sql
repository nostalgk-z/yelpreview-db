SELECT tip.*, users.name as user_name, business.name as business_name, business.city as business_city
FROM tip
    INNER JOIN users on tip.user_id = users.id
    INNER JOIN business on tip.business = business.id
WHERE tip.user_id = ${userID}
ORDER BY tip.date DESC
LIMIT 1
