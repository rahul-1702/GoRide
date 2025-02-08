import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.execute(sql, params, (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
