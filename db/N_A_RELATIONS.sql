
CREATE TABLE IF NOT EXISTS Business (
    id           CHAR(22)    PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS Category (
	id SERIAL PRIMARY KEY,
	type      TEXT   UNIQUE       NOT NULL
);

/* Exactly One to Many weak entity with Business */
CREATE TABLE IF NOT EXISTS CheckIn (
    business CHAR(22) REFERENCES Business(id),
	date     TIMESTAMP, -- partial key
	PRIMARY KEY (business,date)
);

/*Many to Many between Business and Category*/
CREATE TABLE IF NOT EXISTS HasCategory (
	business CHAR(22) REFERENCES Business(id),
	category INTEGER  REFERENCES Category(id),
	PRIMARY KEY (business,category) -- implied cannot be null
);

CREATE TABLE IF NOT EXISTS Hours (
  business    CHAR(22)   REFERENCES Business(id),
  day_of_week VARCHAR,
  open        TIME       NOT NULL,
  close       TIME       NOT NULL,
  PRIMARY KEY (business, day_of_week)
);

CREATE TABLE IF NOT EXISTS Users (
    id            CHAR(22)    PRIMARY KEY,
    name          TEXT        NOT NULL,
    avg_stars     FLOAT       NOT NULL,
    cool          INTEGER     NOT NULL,
    fans          INTEGER     NOT NULL,
    useful        INTEGER     NOT NULL,
    yelping_since TIMESTAMP   NOT NULL,
    tip_count     INTEGER     NOT NULL,
    funny         INTEGER     NOT NULL,
    total_likes   INTEGER     NOT NULL,
    longitude     REAL,
    latitude      REAL
);

CREATE TABLE IF NOT EXISTS Friend (
    user_id CHAR(22) REFERENCES Users(id),
    friend  CHAR(22) REFERENCES Users(id),
    PRIMARY KEY (user_id,friend) -- implied cannot be null
);

/* Ternary relation involving Business and User [[ENTITY]] */
CREATE TABLE IF NOT EXISTS Tip (
	id       SERIAL    PRIMARY KEY,
	business CHAR(22)  REFERENCES Business(id),
	user_id  CHAR(22)  REFERENCES Users(id),
	date     TIMESTAMP NOT NULL,
	text     TEXT      NOT NULL,
	likes    INTEGER   NOT NULL
);
