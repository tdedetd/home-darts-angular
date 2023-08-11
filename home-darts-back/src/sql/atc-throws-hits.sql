SELECT count(t.id)::int as throws, sum(t.hit::int)::int as hits
FROM public.throw t
  left join public.game g on t.game_id = g.id
WHERE g.gamemode_name = 'aroundTheClock' and t.player_id = $1;
