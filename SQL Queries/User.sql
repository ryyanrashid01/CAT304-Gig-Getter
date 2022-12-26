CREATE TABLE Users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    dob date NOT NULL,
    email varchar(60) NOT NULL,
    prof_pass varchar(60) NOT NULL
  ) 