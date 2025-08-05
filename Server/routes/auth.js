const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const router = express.Router();
const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const routeGuard = require("../middleware/verifyToken");

router.post("/register", async (req, res) => {
  const { name, email, password, role, gender } = req.body;

  try {
    const hashedpassword = await bcrypt.hash(password, 10);

    const allowedRoles = ["user", "trainer", "nutritionist"];

   const allowedGender = ["male", "female"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role selected" });
    }

    if (!allowedGender.includes(gender)) {
      return res.status(400).json({ error: "Invalid gender selected" });
    }

    const result = await pool.query(
      "INSERT INTO users ( name , email , password , role , gender ) VALUES ($1, $2, $3, $4, $5) RETURNING id , name , email, role, gender",
      [name, email, hashedpassword, role , gender]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("error inserting", error);
    if (error.code === "23505") {
      res.status(409).send("username or email already exsist");
    }
    res.status(500).send("Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = userResult.rows[0];
    if (!user) return res.status(404).send("Email not found");

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(401).send("invalid credintials");

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.send({ token });
  } catch (error) {
    console.log("error loggin in", error);
    res.status(500).send("Error");
  }
});

router.get("/profile", routeGuard, async (req, res) => {
  console.log("User from token:", req.user);
  const { id } = req.user;

  try {
    const result = await pool.query(
      "SELECT name, email , role , gender FROM users WHERE id = $1",
      [id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log("error showing the data", error);
    res.status(500).send("Error fetching");
  }
});

module.exports = router;
