CREATE TABLE Profile (
  profile_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INTEGER REFERENCES Users(user_id),
  address VARCHAR(255),
  bio VARCHAR(255),
  telephone VARCHAR(255),
  instagram VARCHAR(255),
  linkedin VARCHAR(255),
  status VARCHAR(255)
);

INSERT INTO Profile VALUES (742189, 11, "Kuala Lumpur", "Give this man a shield!", "+60 0326925209", "https://www.instagram.com/chrisevans/", NULL, "active");