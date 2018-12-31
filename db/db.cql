CREATE KEYSPACE IF NOT EXISTS fmtri WITH replication = {'class': 'SimpleStrategy', 'replication_factor':1};
CREATE KEYSPACE IF NOT EXISTS asd WITH replication = {'class': 'SimpleStrategy', 'replication_factor':1};


CREATE TABLE asd.apikey (
    apikey text PRIMARY KEY,
    created int,
    orgid uuid,
    secret text
);

CREATE TABLE asd.pixels (
    pixelid    uuid,
    html      text,
    pixel     uuid,
    deleted   boolean,
    created   int,
    PRIMARY KEY(pixelid)
);

CREATE TABLE asd.pixelslist (
    pixelid   uuid,
    eventid   uuid,
    pixelname text,
    deleted   boolean,
    created   int,
    PRIMARY KEY(pixelid)
);
CREATE INDEX ON asd.pixelslist(eventid);

insert into asd.apikey (apikey,orgid,secret) values ('pub_nLbIjlCWNKAdB_O3qgTaoQ',ea6fcefd-dc90-4117-91c7-d03c6123c126, 'key_BuwheEROchU89mdQhUoVDA');
