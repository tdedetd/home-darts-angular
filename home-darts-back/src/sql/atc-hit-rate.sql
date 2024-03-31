SELECT th.nominal, count(th.nominal) as throws, sum(th.hit_int) as hits
FROM (
	SELECT t.nominal, CASE WHEN t.hit THEN 1 ELSE 0 END as hit_int
	FROM public.throw t
		join public.get_atc_games_ids(1, 'any') g on t.game_id = g.game_id
) as th
GROUP BY th.nominal
ORDER BY th.nominal;
