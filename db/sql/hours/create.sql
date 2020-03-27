CREATE TABLE Hours (
  business    CHAR(22)   REFERENCES Business(id),
  day_of_week VARCHAR    NOT NULL,
  open        VARCHAR  NOT NULL,
  close       VARCHAR  NOT NULL,
  PRIMARY KEY (business, day_of_week)
);