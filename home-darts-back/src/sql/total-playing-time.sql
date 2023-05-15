SELECT coalesce(sum(gt.playing_time)::real, 0) as "totalPlayingTimeSeconds" FROM (
    SELECT
        t.game_id,
        extract(epoch FROM max(t.creation_date) - min(t.creation_date)) as playing_time
    FROM public.throw t
    WHERE t.player_id = $1
    GROUP BY t.game_id
) gt;
