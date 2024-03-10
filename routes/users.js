const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/authmiddleware");

//registration requests
router.post("/regi", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await users.findOne({ where: { username: username } });
    if (!user) {
      bcrypt.hash(password, 10).then((hash) => {
        users.create({
          username: username,
          email: email,
          password: hash,
        });
        res.json("Success");
      });
    } else {
      res.json({ error: "User already exists" }); // 409
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "DB connection issue?" });
  }
});

//Login requests
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await users.findOne({ where: { username: username } }); //TO DO: add try catch

  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Password does not match." });
      } else {
        const accessToken = sign(
          { username: user.username, id: user.userId },
          process.env.TOKENKEY
        );
        res.json(accessToken);
      }
    });
  } else {
    res.json({ error: "User does not exist" }); //400
  }
});

//this is the auth-validator that is called when you first open the site
router.get("/", validateToken, (req, res) => {
  res.json(res.user);
});

module.exports = router;
