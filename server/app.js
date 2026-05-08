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

// Route to display the user's stats
app.get("/stats", async (_, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM player_stats ORDER BY id ASC",
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to receive the user's score
app.post("/stats", async (req, res) => {
  const { attempt } = req.body;
  const userAttempt = parseInt(attempt);

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
