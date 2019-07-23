var moment = require("moment");
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
    const sql =
      "CREATE TABLE IF NOT EXISTS flu_data (id SERIAL PRIMARY KEY, hadFever BOOLEAN NOT NULL, hadCough BOOLEAN NOT NULL, temperature INTEGER DEFAULT 0,created_date TIMESTAMP)";
    this.pool
      .query(sql)
      .then(res => {
        console.log(res);
        this.pool.end();
        return true;
      })
      .catch(err => {
        console.log(err);
        this.pool.end();
        return false;
      });
  }

  insertData(data) {
    console.log(data);
    if (this.connect() == false) {
      return false;
    }
    const text = `INSERT INTO
      flu_data( hadFever, hadCough, temperature, created_date)
      VALUES($1, $2, $3, $4)
      returning *`;

    const values = [
      data["hadFever"],
      data["hadCough"],
      data["temperature"],
      moment(new Date())
    ];

    this.pool.query(text, values, function(err, result) {
      console.log(err, result);

      if (err) {
        this.pool.end();
        return false;
      } else {
        this.pool.end();
        return true;
      }
    });
  }
}

module.exports = FluService;
