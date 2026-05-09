-- Query 1: For creating the user's stats table 
CREATE TABLE player_stats (
  id PRIMARY SERIAL KEY,
  score INTEGER
)

-- Query 2: For counting the frequency of each attempts
SELECT score, COUNT(*) AS frequency
FROM player_stats
GROUP BY score
ORDER BY score ASC