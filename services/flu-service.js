var pg = require("pg");

class FluService {
  constructor() {}
  connect() {
    this.pool = new pg.Pool({
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      database: process.env.RDS_DATABASE
    });
    console.log(this.pool);

    this.pool.connect(function(err, client, done) {
      if (err) {
        console.error("Database connection failed: " + err.stack);
        return false;
      }
      console.log("Connected to database.");
      return true;
    });
  }
  createTable() {
    if (this.connect() == false) {
      return false;
    }
    var query = this.pool.query(
      "CREATE TABLE IF NOT EXISTS flu_data (id SERIAL PRIMARY KEY, hadFever BOOLEAN NOT NUL, hadCough BOOLEAN NOT NUL, temperature INTEGER DEFAULT(0)",
      function(err, result) {
        if (err) {
          return false;
        }
        console.log(err, result);
        return true;
      }
    );
  }

  insertData(data) {
    if (this.connect() == false) {
      return false;
    }
    var query = this.pool.query("INSERT INTO flu_data SET ?", data, function(
      err,
      result
    ) {
      if (err) {
        return false;
      }
      console.log(err, result);
      return true;
    });
  }
}

module.exports = FluService;
