DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE users (
  id serial primary key,
  firstName varchar(40),
  lastName varchar(40),
  facebookId varchar(60),
  userPhone bigint,
  email varchar(60)
);

CREATE TABLE favorites (
  id serial primary key,
  facebook_id varchar(60),
  riverId varchar(10),
  riverLevel int CHECK (riverLevel > 0),
  UNIQUE (facebook_id, riverId)
);
