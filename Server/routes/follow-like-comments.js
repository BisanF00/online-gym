require("dotenv").config();
const express = require("express");
const router = express.Router();
const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const routeGuard = require("../middleware/verifyToken");

router.post("/coaches/:id/like", routeGuard, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await pool.query(
      "INSERT INTO likes (user_id, trainer_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [userId, id]
    );
    res.json({ message: "Liked!" });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Already liked" });
    }
    console.log("Like error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/coaches/:id/like-count",  async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "SELECT COUNT(*) FROM likes WHERE trainer_id = $1",
    [id]
  );
  res.json({ count: result.rows[0].count });
});

router.get("/coaches/:id/isLiked", routeGuard, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const result = await pool.query(
    "SELECT 1 FROM likes WHERE user_id = $1 AND trainer_id = $2",
    [userId, id]
  );

  res.json({ liked: result.rowCount > 0 });
});



router.post("/coaches/:id/rate", routeGuard, async (req, res) => {
  const { score } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await pool.query(
      "INSERT INTO ratings (user_id, trainer_id, score) VALUES ($1, $2, $3)",
      [userId, id, score]
    );
    res.json({ message: "Rated!" });
  } catch (error) {
    console.log("error showing the data", error);
    res.status(500).send("Error fetching");
  }
});

router.get("/coaches/:id/ratings",  async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "SELECT AVG(score)::numeric(2,1) as average, COUNT(*) as total FROM ratings WHERE trainer_id = $1",
    [id]
  );
  res.json(result.rows[0]);
});


router.post("/coaches/:id/comment", routeGuard, async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await pool.query(
      "INSERT INTO comments (user_id, trainer_id, content) VALUES ($1, $2, $3)",
      [userId, id, content]
    );
    res.json({ message: "Comment added!" });
  } catch (error) {
    console.log("error showing the data", error);
    res.status(500).send("Error fetching");
  }
});

router.get("/coaches/:id/comments",  async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `SELECT c.content, u.name, c.created_at 
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.trainer_id = $1
     ORDER BY c.created_at DESC`,
    [id]
  );
  res.json(result.rows);
});


router.post("/coaches/:id/follow", routeGuard, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await pool.query(
      "INSERT INTO follows (user_id, trainer_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [userId, id]
    );
    res.json({ message: "Followed!" });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Already Followed" });
    }
    console.log("follow error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/coaches/:id/followers",  async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "SELECT COUNT(*) FROM follows WHERE trainer_id = $1",
    [id]
  );
  res.json({ count: result.rows[0].count });
});

router.get("/coaches/:id/isFollowed", routeGuard, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const result = await pool.query(
    "SELECT 1 FROM follows WHERE user_id = $1 AND trainer_id = $2",
    [userId, id]
  );

  res.json({ followed: result.rowCount > 0 });
});



module.exports = router;
