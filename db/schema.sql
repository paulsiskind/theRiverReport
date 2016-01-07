DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE users (
  id serial primary key,
  firstName varchar(40),
  lastName varchar(40),
  facebookId varchar(60),
  userPhone int
);

CREATE TABLE favorites (
  id serial primary key,
  facebook_id varchar(60),
  river_id varchar(10),
  riverLevel int
);
