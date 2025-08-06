require("dotenv").config();
const express = require("express");
const router = express.Router();
const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

router.get("/coaches", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, description , specialty, gender, image_url FROM trainers"
    );
    res.json(result.rows);
  } catch (error) {
    console.log("error showing the data", error);
    res.status(500).send("Error fetching");
  }
});

module.exports = router;