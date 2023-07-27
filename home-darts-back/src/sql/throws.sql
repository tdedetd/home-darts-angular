SELECT
  t.id,
  t.creation_date as "creationDate",
  t.game_id as "gameId",
  t.player_id as "playerId",
  t.hit,
  t.nominal,
  t.multiplier
FROM public.throw t
WHERE t.game_id = $1
ORDER BY t.creation_date desc;
