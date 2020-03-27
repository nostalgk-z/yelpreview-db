/* Exactly One to Many weak entity with Business */
CREATE TABLE IF NOT EXISTS CheckIn (
    business CHAR(22) REFERENCES Business(id),
	date     TIMESTAMP, -- partial key
	PRIMARY KEY (business,date)
);
