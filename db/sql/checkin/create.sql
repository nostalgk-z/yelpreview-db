/* Exactly One to Many weak entity with Business */
CREATE TABLE IF NOT EXISTS CheckIn (
    business CHAR(22) REFERENCES Business(id),
	date     TIMESTAMP, -- partial key
	PRIMARY KEY (business,date)
);

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


