SELECT gp2.value as "sectionType", count(g.id)::int as "gamesCount"
FROM public.game_player gp
    inner join public.game g on gp.game_id = g.id
    inner join public.game_param gp2 on gp2.game_id = g.id
WHERE gp2.param_name = 'hitDetection' and g.gamemode_name = 'aroundTheClock' and gp.player_id = $1
GROUP BY gp2.value;
