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