CREATE TABLE Hours (
  id          CHAR(22)   REFERENCES Business(id),
  day_of_week VARCHAR    NOT NULL,
  open        TIMESTAMP  NOT NULL,
  close       TIMESTAMP  NOT NULL,
  PRIMARY KEY (id, day_of_week)
);