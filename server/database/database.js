import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "wordle",
  password: "Neruda311209",
  port: 5432,
});

export default pool;
