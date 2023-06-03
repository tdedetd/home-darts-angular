SELECT p.id, p.creation_date as "creationDate", p.username
FROM public.game_player gp left join public.player p on gp.player_id = p.id
WHERE gp.game_id = $1;
