import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "Rahul",
  password: "123456",
  database: "go_ride",
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
