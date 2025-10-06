CREATE DATABASE user_managment;
USE user_managment;

CREATE TABLE userx (
  id BIGINT UNIQUE,
  namex CHAR(50),
  last_name CHAR(50),
  email VARCHAR(100) UNIQUE,
  pass VARCHAR(50),
  rolex INT(2),
  dept INT(2),
  sk VARCHAR(55) UNIQUE
);

INSERT INTO userx (id, namex, last_name, email, pass, rolex, dept)
VALUES (249020307001, 'Aarav', 'Shah', 'aaravprogrammers@gmail.com', 'admin', 1, 1);
select * from userx;