/*Many to Many between Business and Category*/
CREATE TABLE IF NOT EXISTS HasCategory (
	business CHAR(22) REFERENCES Business(id),
	category TEXT REFERENCES Category(type),
	PRIMARY KEY (business,category) -- implied cannot be null
);
