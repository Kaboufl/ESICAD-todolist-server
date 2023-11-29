var mysql = require("mysql2");
require("dotenv").config();
console.log(process.env);

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});
con.connect(function (err: any) {
  if (err) throw err;
  console.log("Connected!");
});
export const query = async (query: string): Promise<any> =>
  new Promise((resolve, reject) => {
    con.query(query, (error: any, results: unknown, fields: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
