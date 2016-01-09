DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE users (
  id serial primary key,
  firstName varchar(40),
  lastName varchar(40),
  facebookId varchar(60),
  userPhone bigint
);

CREATE TABLE favorites (
  id serial primary key,
  facebook_id varchar(60),
  riverId varchar(10) CONSTRAINT must_be_different UNIQUE,
  riverLevel int
);
