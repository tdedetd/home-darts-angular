SELECT gp.value as "sectionType", count(t.id)::int as throws, sum(t.hit::int)::int as hits
FROM public.throw t inner join public.game_param gp on t.game_id = gp.game_id
WHERE gp.param_name = 'hitDetection' and t.player_id = $1
GROUP BY gp.value;
