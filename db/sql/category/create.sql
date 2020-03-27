CREATE TABLE IF NOT EXISTS Category (
	id   SERIAL,
	type TEXT,

	PRIMARY KEY (id, type)
);
