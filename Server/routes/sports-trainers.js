require("dotenv").config();
const express = require("express");
const router = express.Router();
const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

router.get("/sports/:sportId/trainers", async (req, res) => {
  const { sportId } = req.params;
  try {
    const result = await pool.query(
      `SELECT t.id, t.name, t.image_url, t.description, t.specialty
       FROM trainers t
       JOIN trainer_sports ts ON t.id = ts.trainer_id
       WHERE ts.sport_id = $1`,
      [sportId]
    );
    res.json(result.rows);
  } catch (error) {
    console.log("error showing the data", error);
    res.status(500).send("Error fetching");
  }
});

module.exports = router;