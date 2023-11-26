var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: 'todo',
  password: 'todo',
  port: 6603,
  database: "DBtodo",
});
con.connect(function (err: any) {
  if (err) throw err;
  console.log("Connected!");
});
export const query = async (query: string): Promise<any> => new Promise((resolve, reject) => {
  con.query(query, (error: any, results: unknown, fields: any) => {
    if (error) {
      reject(error);
    } else {
      resolve(results);
    }
  });
});
