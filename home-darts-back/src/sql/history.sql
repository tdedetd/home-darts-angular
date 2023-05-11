SELECT
    g.id,
    g.creation_date as "creationDate",
    g.gamemode_name as "gamemodeName",
    g.is_completed as "isCompleted",
    coalesce(gt.throws, 0) as throws,
    coalesce(gt.hits, 0) as hits 
FROM public.game g
    LEFT JOIN (
    SELECT t.game_id, count(t.id)::int as throws, sum(t.hit::int)::int as hits
    FROM public.throw t
    WHERE t.player_id = $1
    GROUP BY t.game_id
) gt on g.id = gt.game_id
ORDER BY g.creation_date desc
LIMIT $2 OFFSET $3;
