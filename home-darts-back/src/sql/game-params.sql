SELECT gp.param_name as name, gp.value, gpt."datatype" 
FROM public.game_param gp left join public.game_param_type gpt on gp.param_name = gpt."name" 
WHERE gp.game_id = $1;
