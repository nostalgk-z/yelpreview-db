CREATE TABLE Friend (
    user_id CHAR(22) REFERENCES Users(id),
    friend  CHAR(22) REFERENCES Users(id),
    PRIMARY KEY (user_id,friend) -- implied cannot be null
)
