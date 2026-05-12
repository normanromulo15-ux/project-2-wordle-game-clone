-- Query to create the user's stats table 
CREATE TABLE player_stats (
  id PRIMARY SERIAL KEY,
  score INTEGER
)

-- Query to count the frequency of each attempts
SELECT score, COUNT(*) AS frequency
FROM player_stats
WHERE score > 0
GROUP BY score
ORDER BY score ASC

-- Query to select all non-zero scores
SELECT * FROM player_stats WHERE score > 0

-- QUery to delete all data
DELETE * FROM player_stats