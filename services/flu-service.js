var pg = require("pg");

console.log(pg);
var pool = new pg.Pool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT
});

// connection using created pool
pool.connect(function(err, client, done) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

pool.end();

export function insertData(data) {
  var query = pool.query("INSERT INTO flu_data SET ?", data, function(
    err,
    result
  ) {
    console.log(err, result);
  });
}
