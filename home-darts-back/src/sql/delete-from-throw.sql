DELETE FROM public.throw WHERE id = $1
RETURNING id, creation_date as "creationDate", game_id as "gameId", player_id as "playerId", hit, nominal, multiplier;
