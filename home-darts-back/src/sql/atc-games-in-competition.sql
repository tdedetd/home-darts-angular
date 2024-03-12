SELECT ag.game_id
FROM atc_game ag
INNER JOIN game_player gp on ag.game_id = gp.game_id
WHERE gp.player_id = $1
	and ag.direction = $2
	and ag.hit_detection = $3
	and ag.fast_game = $4
	and ag.include_bull = $5
