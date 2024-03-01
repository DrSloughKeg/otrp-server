const express = require("express");
const router = express.Router();
const { characters } = require("../models");
const { users } = require("../models");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/authmiddleware");
const { validatePlayToken } = require("../middleware/eventhandler");

router.post("/play", validateToken, async (req, res) => {
  const userId = req.userToken.id;
  try {
    const user = await users.findOne({ where: { userId: userId } });
    const char = await characters.findOne({
      where: { charId: req.body.charId },
    });
    if (!user) {
      res.json({ error: "user not logged in" });
    } else if (!char) {
      res.json({ error: "character does not exist" });
    } else if (char.userId != user.userId) {
      res.json({
        error: "you do not have permission to access this character",
      });
    } else {
      const playToken = sign(
        { charId: char.charId },
        "secure" //TO DO: change this to env
      );
      res.json(playToken);
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "DB connection issue?" });
  }
});

router.get("/getEvent", validateToken, validatePlayToken, async (req, res) => {
  const userId = req.userToken.id;
  const charId = req.charToken.charId;
  try {
    const user = await users.findOne({ where: { userId: userId } });
    const char = await characters.findOne({
      where: { charId: charId },
    });
    if (!user) {
      res.json({ error: "user not logged in" });
    } else if (!char) {
      res.json({ error: "character does not exist" });
    } else if (char.userId != user.userId) {
      res.json({
        error: "you do not have permission to access this character",
      });
    } else {
      res.json(char);
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "DB connection issue?" });
  }
});

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
      res.json({ error: "user not logged in" });
    } else {
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
      res.json("success");
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

router.delete("/delete", validateToken, async (req, res) => {
  const userId = req.userToken.id;
  try {
    const user = await users.findOne({ where: { userId: userId } });
    const char = await characters.findOne({
      where: { charId: req.body.charId },
    });
    if (!user) {
      res.json({ error: "user not logged in" });
    } else if (!char) {
      res.json({ error: "character does not exist" });
    } else if (char.userId != user.userId) {
      res.json({ error: "you do not have permission to delete this" });
    } else {
      await char.destroy();
      res.json({ success: "character deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "DB connection issue?" });
  }
});

module.exports = router;
