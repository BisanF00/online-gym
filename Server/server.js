require ("dotenv").config();
const express = require ("express");
const bodyParser = require('body-parser');
var cors = require ("cors");
const pg = require ("pg");
const app = express ();

app.use (cors());

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.use (express.static("public"));
app.use (express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require ("./routes/auth");
const sports = require ("./routes/sports");
const trainers = require ("./routes/trainers");

app.use ("/user", auth)
app.use ("/api", sports, trainers)

app.use ((req , res) => {
  res.status (404).send("Page not found <a href='/'>Get back home</a>");
});

const port = process.env.PORT || 3000;

pool
  .connect()
  .then((client) => {
    return client
      .query("SELECT current_database(), current_user")
      .then((res) => {
        client.release();
 
        const dbName = res.rows[0].current_database;
        const dbUser = res.rows[0].current_user;
 
        console.log(
          `Connected to PostgreSQL as user '${dbUser}' on database '${dbName}'`
        );
 
        console.log(`App listening on port http://localhost:${port}`);
      });
  })
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.error("Could not connect to database:", err);
  });