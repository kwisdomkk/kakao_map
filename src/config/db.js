import mysql from "mysql2";

// DB설정
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// 커넥션 풀
const db = mysql.createPool(config).promise();

export default db;
