CREATE TABLE Friend (
    user   INTEGER REFERENCES User(user_id),
    friend INTEGER REFERENCES User(user_id),
    PRIMARY KEY (user,friend) -- implied cannot be null
)
