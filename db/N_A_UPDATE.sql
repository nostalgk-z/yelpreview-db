-- noinspection SqlWithoutWhere
-- update the business table num_checkins and num_tips
UPDATE Business
SET
    num_checkins = (
        SELECT COUNT(checkin.business)
        FROM checkin
        WHERE checkin.business = public.business.id
    ),
    num_tips = (
        SELECT COUNT(tip.business)
        FROM tip
        WHERE tip.business = public.business.id
    );

-- noinspection SqlWithoutWhere
-- update the users table tip_count and total_likes
UPDATE users
SET
    tip_count = (
        SELECT COUNT(tip.user_id)
        FROM tip
        WHERE tip.user_id = users.id
    ),
    total_likes = (
        SELECT COALESCE(SUM(tip.likes), 0)
        FROM tip
        WHERE tip.user_id = users.id
    );
