SELECT count(g.id)::int as "gamesCount"
FROM public.game_player gp
    left join public.game g on gp.game_id = g.id
WHERE gp.player_id = $1;
