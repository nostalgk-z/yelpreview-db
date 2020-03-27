/* Ternary relation involving Business and User [[ENTITY]] */
CREATE TABLE IF NOT EXISTS Tip (
	id       CHAR(22)  PRIMARY KEY,
	business CHAR(22)  REFERENCES Business(id),
	user_id  CHAR(22)  REFERENCES Users(id),
	date     TIMESTAMP NOT NULL,
	text     TEXT      NOT NULL
);
