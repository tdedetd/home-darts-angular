-- PostgreSQL 15.2

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

-- views

CREATE OR REPLACE VIEW public.atc_game as
SELECT
	atc_ids.game_id,
	atc_ids.creation_date,
	atc_ids.is_completed,
	g_dir.direction,
	g_hit.hit_detection,
	g_fast.fast_game,
	g_bull.include_bull
FROM (
	SELECT g.id as game_id, g.creation_date, g.is_completed
	FROM public.game g
	WHERE g.gamemode_name = 'aroundTheClock'
) atc_ids
left join (
	SELECT gp.game_id, gp.value as "direction"
	FROM public.game_param gp
	WHERE gp.param_name = 'direction'
) g_dir on atc_ids.game_id = g_dir.game_id
left join (
	SELECT gp.game_id, gp.value as "hit_detection"
	FROM public.game_param gp
	WHERE gp.param_name = 'hitDetection'
) g_hit on atc_ids.game_id = g_hit.game_id
left join (
	SELECT gp.game_id, gp.value as "fast_game"
	FROM public.game_param gp
	WHERE gp.param_name = 'fastGame'
) g_fast on atc_ids.game_id = g_fast.game_id
left join (
	SELECT gp.game_id, gp.value as "include_bull"
	FROM public.game_param gp
	WHERE gp.param_name = 'includeBull'
) g_bull on atc_ids.game_id = g_bull.game_id;

-- functions

CREATE OR REPLACE FUNCTION public.get_longest_hits_streak(
	in_player_id int,
	in_section_type text default 'any'
)
RETURNS int AS $$
DECLARE
	current_hits_streak int = 0;
	max_hits_streak int = 0;
	previous_game_id int = null;
	reс record;
BEGIN
	FOR reс in (
		SELECT t.game_id, t.hit
		FROM public.throw t
			inner join public.game_param gp on t.game_id = gp.game_id
			inner join public.game g on t.game_id = g.id
		WHERE
			gp.param_name = 'hitDetection' and
			g.gamemode_name = 'aroundTheClock' and
			gp.value = in_section_type and
			t.player_id = in_player_id
		ORDER BY t.game_id, t.creation_date
	)
	LOOP
		IF previous_game_id != reс.game_id THEN
			current_hits_streak := 0;
		END IF;

		IF reс.hit THEN
			current_hits_streak := current_hits_streak + 1;
			max_hits_streak := GREATEST(max_hits_streak, current_hits_streak);
		ELSE
			current_hits_streak := 0;
		END IF;

		previous_game_id := reс.game_id;
	END LOOP;

	RETURN max_hits_streak;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.get_atc_games_ids(
	in_player_id int,
	in_hit_detection varchar(16),
	in_direction varchar(16) = null,
	in_fast_game varchar(16) = null,
	in_include_bull varchar(16) = null,
	in_is_completed bool = null
) RETURNS table (
	game_id int
) as $$
DECLARE
	query_text text = '';
BEGIN
	query_text = '
		SELECT ag.game_id
		FROM public.atc_game ag
		INNER JOIN public.game_player gp on ag.game_id = gp.game_id
		WHERE gp.player_id = $1
			and ag.hit_detection = $2
	';

	IF in_direction is not null THEN
		query_text = query_text || ' and ag.direction = $3';
	END IF;

	IF in_fast_game is not null THEN
		query_text = query_text || ' and ag.fast_game = $4';
	END IF;

	IF in_include_bull is not null THEN
		query_text = query_text || ' and ag.include_bull = $5';
	END IF;

	IF in_is_completed is not null THEN
		query_text = query_text || ' and ag.is_completed = $6';
	END IF;

	RETURN query EXECUTE query_text using
		in_player_id,
		in_hit_detection,
		in_direction,
		in_fast_game,
		in_include_bull,
		in_is_completed;
END;
$$ LANGUAGE plpgsql;
