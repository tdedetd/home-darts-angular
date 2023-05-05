-- filter by player_id, multiplier
select th.nominal, count(th.nominal) as throws, sum(th.hit_int) as hits
from
	(select t.nominal, case when t.hit then 1 else 0 end as hit_int
	from public.throw t
	where t.player_id = $1
	order by t.nominal) as th
group by th.nominal;
