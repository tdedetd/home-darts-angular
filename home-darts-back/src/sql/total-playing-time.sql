WITH td as (
    SELECT
        t.game_id,
        lead(t.game_id) over (ORDER BY t.game_id, t.creation_date) as game_id_next,
        t.creation_date,
        lead(t.creation_date) over (ORDER BY t.game_id, t.creation_date) as creation_date_next
    FROM public.throw t 
    WHERE t.player_id = $1
    ORDER BY t.game_id, t.creation_date
)
SELECT coalesce(sum(
    least(extract(epoch FROM td.creation_date_next - td.creation_date), $2)
), 0)::real as "totalPlayingTimeSeconds"
FROM td
WHERE td.game_id = td.game_id_next;
