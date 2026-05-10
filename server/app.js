import express from "express";
import cors from "cors";
import pool from "./database/database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Route to get the user's win rate
app.get("/scores", async (_, res) => {
  const query = "SELECT score FROM player_stats";

  try {
    const result = await pool.query(query);
    const { rows } = result;
    const wins = rows.filter((e) => e.score > 0).length;
    const losses = rows.length - wins;

    const data = [
      {
        name: "success",
        record: wins,
      },
      { name: "fail", record: losses },
    ];

    res.json(data);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to display the user's stats
app.get("/stats", async (_, res) => {
  const query =
    "SELECT score, COUNT(score) AS frequency FROM player_stats WHERE score > 0 GROUP BY score ORDER BY score ASC";

  try {
    const result = await pool.query(query);
    const { rows } = result;

    const data = rows.map((e) => {
      return { score: e.score, frequency: Number(e.frequency) };
    });
    res.json(data);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to receive the user's score
app.post("/stats", async (req, res) => {
  const { attempt } = req.body;
  const userAttempt = Number(attempt);

  try {
    const result = await pool.query(
      "INSERT INTO player_stats (score) VALUES ($1) RETURNING *",
      [userAttempt],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => console.log("Server running at port 3000"));
