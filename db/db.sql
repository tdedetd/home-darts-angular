-- tables

create table public.gamemode (
	system_name varchar(32) primary key,
	name varchar(32) not null unique
);

create table public.game_param_type (
	name varchar(16) primary key,
	description varchar(128) not NULL
);

create table public.throw (
	id serial primary key,
	creation_date timestamp NOT NULL,
	game_id int not null,
	player_id int not null,
	hit boolean not null,
	nominal SMALLINT NOT null check (nominal BETWEEN 1 AND 20 or nominal = 25),
	multiplier SMALLINT NOT null check (multiplier between 1 and 3)
);

create table public.game (
	id serial primary key,
	creation_date timestamp NOT NULL,
	gamemode_name varchar(32) NOT null,
	is_completed boolean NOT NULL DEFAULT FALSE
);

create table public.game_player (
	id serial primary key,
	game_id int not null,
	player_id int not NULL
);

create table public.game_param (
	id serial primary key,
	game_id int not null,
	param_name varchar(16) not null,
	value varchar(16) not null,
	unique (game_id, param_name) 
	--- row level constraints
);

create table public.player (
	id serial primary key,
	creation_date timestamp NOT NULL,
	username varchar(64) UNIQUE NOT NULL,
	is_hidden boolean NOT NULL DEFAULT false
);

-- fk

ALTER table public.throw
ADD CONSTRAINT fk_throw_game_id
FOREIGN KEY (game_id)
REFERENCES game (id);

ALTER table public.throw
ADD CONSTRAINT fk_throw_player_id
FOREIGN KEY (player_id)
REFERENCES player (id);

ALTER table public.game
ADD CONSTRAINT fk_game_gamemode_name
FOREIGN KEY (gamemode_name)
REFERENCES gamemode (system_name);

ALTER table public.game_player
ADD CONSTRAINT fk_game_player_game_id
FOREIGN KEY (game_id)
REFERENCES game (id);

ALTER table public.game_player
ADD CONSTRAINT fk_game_player_player_id
FOREIGN KEY (player_id)
REFERENCES player (id);

ALTER table public.game_param
ADD CONSTRAINT fk_game_param_game_id
FOREIGN KEY (game_id)
REFERENCES game (id);

ALTER table public.game_param
ADD CONSTRAINT fk_game_param_param_name
FOREIGN KEY (param_name)
REFERENCES game_param_type (name);

-- inserts

insert into public.gamemode (system_name, name) values
	('around_the_clock', 'Around the clock');

insert into public.game_param_type (name, description) values
	('include_bull', ''),
	('direction', ''),
	('hit_detection', ''),
	('fast_game', '');
