SELECT t.player_id as "playerId", sum(t.hit::int)::int as hits, count(t.id)::int as throws
FROM public.throw t
WHERE t.game_id = $1
GROUP BY t.player_id;
