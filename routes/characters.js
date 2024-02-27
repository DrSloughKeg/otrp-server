const express = require("express");
const router = express.Router();
const { characters } = require("../models");
const { validateToken } = require("../middleware/authmiddleware");

router.post("/create", async (req, res) => {
  const {} = req.body;
  try {
    //const user = await users.findOne({ where: { username: username } });
    if (!user) {
    } else {
      res.json({ error: "User already exists" }); // 409
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "DB connection issue?" });
  }
});

//TO DO: what is this?
router.get("/getByUserId", validateToken, (req, res) => {
  res.json(res.user);
});

module.exports = router;
