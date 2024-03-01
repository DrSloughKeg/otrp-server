const express = require("express");
const router = express.Router();
const { characters } = require("../models");
const { users } = require("../models");
const { validateToken } = require("../middleware/authmiddleware");

router.post("/create", validateToken, async (req, res) => {
  //calculate HP and AP
  var hp = 10;
  var ap = 10;
  if (req.body.charClass == "warrior") {
    hp += 2;
    ap -= 4;
  } else if (req.body.charClass == "wizard") {
    hp -= 2;
    ap += 4;
  }
  hp += (req.body.con - 10) / 2;

  const userId = req.userToken.id;
  try {
    const user = await users.findOne({ where: { userId: userId } });
    if (!user) {
    } else {
      res.json({ error: "user not logged in" });
    }
    await characters.create({
      userId: userId,
      hp: hp,
      lvl: 1,
      charName: req.body.name,
      ap: ap,
      evnt: 0,
      class: req.body.charClass,
      ...req.body,
    });
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
