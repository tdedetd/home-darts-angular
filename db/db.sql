-- tables

create table public.gamemode (
	system_name varchar(32) primary key,
	name varchar(32) not null unique
);

create table public.game_param_type (
	name varchar(16) primary key,
	description varchar(128) not NULL,
	"datatype" varchar(16) NOT NULL DEFAULT 'string' CHECK ("datatype" = 'string' or "datatype" = 'boolean' or "datatype" = 'number')
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

ALTER table public.throw ADD CONSTRAINT fk_throw_game_id
FOREIGN KEY (game_id) REFERENCES game (id);

ALTER table public.throw ADD CONSTRAINT fk_throw_player_id
FOREIGN KEY (player_id) REFERENCES player (id);

ALTER table public.game ADD CONSTRAINT fk_game_gamemode_name
FOREIGN KEY (gamemode_name) REFERENCES gamemode (system_name);

ALTER table public.game_player ADD CONSTRAINT fk_game_player_game_id
FOREIGN KEY (game_id) REFERENCES game (id);

ALTER table public.game_player ADD CONSTRAINT fk_game_player_player_id
FOREIGN KEY (player_id) REFERENCES player (id);

ALTER table public.game_param ADD CONSTRAINT fk_game_param_game_id
FOREIGN KEY (game_id) REFERENCES game (id);

ALTER table public.game_param ADD CONSTRAINT fk_game_param_param_name
FOREIGN KEY (param_name) REFERENCES game_param_type (name);

-- inserts

INSERT INTO public.gamemode (system_name, name) values
	('aroundTheClock', 'Around the clock');

INSERT INTO public.game_param_type (name, description, "datatype") values
	('includeBull', '', 'boolean'),
	('direction', '', 'string'),
	('hitDetection', '', 'string'),
	('fastGame', '', 'boolean');

-- functions

CREATE OR REPLACE FUNCTION public.get_longest_hits_streak(in_player_id int)
RETURNS int AS $$
DECLARE
	current_hits_streak int = 0;
	max_hits_streak int = 0;
	previous_game_id int = null;
	record public.throw%rowtype;
BEGIN
	FOR record in (
		SELECT *
		FROM public.throw t
		WHERE t.player_id = in_player_id
		ORDER BY t.game_id, t.creation_date
	)
	LOOP
		IF previous_game_id != record.game_id THEN
			current_hits_streak := 0;
		END IF;

		IF record.hit THEN
			current_hits_streak := current_hits_streak + 1;
			max_hits_streak := GREATEST(max_hits_streak, current_hits_streak);
		ELSE
			current_hits_streak := 0;
		END IF;

		previous_game_id := record.game_id;
	END LOOP;

	RETURN max_hits_streak;
END;
$$ LANGUAGE plpgsql;
