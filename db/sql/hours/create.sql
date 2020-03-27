CREATE TABLE Hours (
  business    CHAR(22)   REFERENCES Business(id),
  day_of_week VARCHAR,
  open        TIME       NOT NULL,
  close       TIME       NOT NULL,

  PRIMARY KEY (business, day_of_week)
);