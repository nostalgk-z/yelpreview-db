CREATE TABLE IF NOT EXISTS Business (
    id CHAR(22) PRIMARY KEY,
    name         TEXT        NOT NULL,
    state        VARCHAR(2)  NOT NULL,
    address      TEXT        NOT NULL,
    postal_code  VARCHAR(10) NOT NULL,
    stars        INTEGER     NOT NULL,
	review_count INTEGER,
    is_open      BOOLEAN, -- consider making derived
    latitude     REAL,
    longitude    REAL,
    num_checkins INTEGER,
    num_tips     INTEGER,
    city         TEXT        NOT NULL
);