SELECT 'any' as "sectionType", public.get_longest_hits_streak($1, 'any') as "longestHitsStreak"
UNION
SELECT 'double', public.get_longest_hits_streak($1, 'double')
UNION
SELECT 'triple', public.get_longest_hits_streak($1, 'triple');
