DROP TABLE IF EXISTS "PERSON";

CREATE TABLE PERSON(
    ID bigint primary key auto_increment,
    NAME varchar (20) not null,
    LAST_NAME varchar(20) not null,
    NUMBER varchar (20) not null,
    EMAIL varchar (50) not null
)

