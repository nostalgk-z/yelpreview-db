
-- CheckIn trigger
CREATE OR REPLACE FUNCTION UpdateCheckIn() RETURNS TRIGGER AS $UpdateCheckIn$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE business
        SET num_checkins = num_checkins + 1
        WHERE business.id = NEW.business;

        RETURN NEW;
    ELSEIF (TG_OP = 'DELETE') THEN
        UPDATE business
        SET num_checkins = GREATEST(0, num_checkins - 1)
        WHERE business.id = OLD.business;

        RETURN OLD;
    ELSEIF (TG_OP = 'UPDATE') THEN
        UPDATE business
        SET num_checkins = GREATEST(0, num_checkins - 1)
        WHERE business.id = old.business;

        UPDATE business
        SET num_checkins = num_checkins + 1
        WHERE business.id = new.business;

        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$UpdateCheckIn$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS UpdateCheckIn
    ON CheckIn;

CREATE TRIGGER UpdateCheckIn
    AFTER INSERT OR UPDATE OR DELETE ON checkin
    FOR EACH ROW
EXECUTE PROCEDURE UpdateCheckIn();


-- Tip trigger
CREATE OR REPLACE FUNCTION UpdateTip() RETURNS TRIGGER AS $UpdateTip$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE business
        SET num_tips = num_tips + 1
        WHERE business.id = NEW.business;

        UPDATE users
        SET tip_count = tip_count + 1
        WHERE users.id = NEW.user_id;

        UPDATE users
        SET total_likes = total_likes + NEW.likes
        WHERE users.id = NEW.user_id;

        RETURN NEW;
    ELSEIF (TG_OP = 'DELETE') THEN
        UPDATE business
        SET num_tips = GREATEST(0, num_tips - 1)
        WHERE business.id = OLD.business;

        UPDATE users
        SET tip_count = GREATEST(0, tip_count - 1)
        WHERE users.id = OLD.user_id;

        UPDATE users
        SET total_likes = total_likes - OLD.likes
        WHERE users.id = NEW.user_id;

        RETURN OLD;
    ELSEIF (TG_OP = 'UPDATE') THEN
        UPDATE business
        SET num_tips = GREATEST(0, num_tips - 1)
        WHERE business.id = OLD.business;

        UPDATE business
        SET num_tips = num_tips + 1
        WHERE business.id = NEW.business;

        UPDATE users
        SET tip_count = GREATEST(0, tip_count - 1)
        WHERE users.id = OLD.user_id;

        UPDATE users
        SET tip_count = tip_count + 1
        WHERE users.id = NEW.user_id;

        UPDATE users
        SET total_likes = total_likes - OLD.likes
        WHERE users.id = OLD.user_id;

        UPDATE users
        SET total_likes = total_likes + NEW.likes
        WHERE users.id = NEW.user_id;

        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$UpdateTip$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS UpdateTip
    ON Tip;

CREATE TRIGGER UpdateTip
    AFTER INSERT OR UPDATE OR DELETE ON tip
    FOR EACH ROW
EXECUTE PROCEDURE UpdateTip();
