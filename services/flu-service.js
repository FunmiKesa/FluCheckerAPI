var pg = require("pg");

console.log(pg);

class FluService {
  constructor() {}
  connect() {
    this.pool = new pg.Pool({
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT
    });

    this.pool.connect(function(err, client, done) {
      if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
      }
      console.log("Connected to database.");
    });
  }
  createTable() {
    this.connect();
    var query = this.pool.query(
      "CREATE TABLE IF NOT EXISTS flu_data (id SERIAL PRIMARY KEY, hadFever BOOLEAN NOT NUL, hadCough BOOLEAN NOT NUL, temperature INTEGER DEFAULT(0)",
      function(err, result) {
        console.log(err, result);
      }
    );
  }

  insertData(data) {
    this.connect();
    var query = this.pool.query("INSERT INTO flu_data SET ?", data, function(
      err,
      result
    ) {
      console.log(err, result);
    });
  }
}

module.exports = FluService;
