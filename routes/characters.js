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
      res.json({ error: "" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "DB connection issue?" });
  }
});

router.get("/getByUserId", validateToken, async (req, res) => {
  const userId = req.userToken.id;
  try {
    const userCharacters = await characters.findAll({
      where: { userId: userId },
    });
    res.json(userCharacters);
  } catch (error) {
    console.log(error);
    res.json({ error: "something went wrong" });
  }
});

module.exports = router;
