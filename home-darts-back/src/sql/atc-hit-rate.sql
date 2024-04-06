SELECT th.nominal as sector, count(th.nominal)::int as throws, sum(th.hit_int)::int as hits
FROM (
	SELECT t.nominal, CASE WHEN t.hit THEN 1 ELSE 0 END as hit_int
	FROM public.throw t
		join public.get_atc_games_ids($1, $2, $3, $4, $5, $6) g on t.game_id = g.game_id
) as th
GROUP BY th.nominal
ORDER BY th.nominal;
