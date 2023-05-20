SELECT p.id, p.creation_date as "creationDate", p.username
FROM public.player p
WHERE not p.is_hidden
ORDER BY p.username;
