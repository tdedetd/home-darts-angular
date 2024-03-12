SELECT
	g.id as game_id,
	g.creation_date,
	coalesce(hits_stat.hits, 0) as hits
FROM game g
JOIN (SELECT unnest($1) as game_id) competition_games on g.id = competition_games.game_id
LEFT JOIN (
	SELECT atc_throws.game_id, sum(atc_throws.hit::int) as hits
	FROM (
		SELECT
			t.game_id,
			t.creation_date,
			t.hit,
			count(t.game_id) OVER (PARTITION BY t.game_id ORDER BY t.creation_date asc) as throw_order
		FROM public.throw t
		WHERE t.player_id = $2
	) atc_throws
	WHERE atc_throws.throw_order <= $3
	GROUP BY atc_throws.game_id
) hits_stat on g.id = hits_stat.game_id
ORDER BY hits_stat.hits desc nulls last, g.creation_date asc
