CREATE TABLE Users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    dob date NOT NULL,
    email varchar(60) NOT NULL,
    prof_pass varchar(60) NOT NULL,
    address VARCHAR(255),
    bio VARCHAR(255),
    telephone VARCHAR(255),
    instagram VARCHAR(255),
    linkedin VARCHAR(255),
    website VARCHAR(255),
    status VARCHAR(255)
  ) 