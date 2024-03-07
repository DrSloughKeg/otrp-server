const express = require("express");
const router = express.Router();
const { characters } = require("../models");
const { users } = require("../models");
const { inventories } = require("../models");
const { charabilities } = require("../models");
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

router.put("/update", validateToken, async (req, res) => {
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
      await characters.update(req.body, { where: { charId: char.charId } });
      res.status(200).json("Character saved");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "DB connection issue?" });
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
      //find the character that was just created
      const char = await characters.findOne({
        where: { charName: req.body.name, userId: userId },
      });
      if (char && char.class === "warrior") {
        //warrior items and abilities
        //add Second Wind
        await charabilities.create({ charId: char.charId, abilityId: 1 });
        //add longsword
        await inventories.create({
          charId: char.charId,
          itemId: 1,
          quantity: 1,
        });
        //add shield
        await inventories.create({
          charId: char.charId,
          itemId: 2,
          quantity: 1,
        });
      } else if (char && char.class === "rogue") {
        //rogue items & abilities
        //add Sneak Attack
        await charabilities.create({ charId: char.charId, abilityId: 2 });
        //add daggers
        await inventories.create({
          charId: char.charId,
          itemId: 3,
          quantity: 2,
        });
      } else if (char && char.class === "wizard") {
        //wizard items & abilities
        //add Firebolt
        await charabilities.create({ charId: char.charId, abilityId: 3 });
        //add Mage Armor
        await charabilities.create({ charId: char.charId, abilityId: 4 });
        //add Sleep
        await charabilities.create({ charId: char.charId, abilityId: 5 });
        //add Fog Cloud
        await charabilities.create({ charId: char.charId, abilityId: 6 });
        //add Quarterstaff
        await inventories.create({
          charId: char.charId,
          itemId: 4,
          quantity: 1,
        });
      }
      //add Health potion
      await inventories.create({
        charId: char.charId,
        itemId: 5,
        quantity: 2,
      });
      //add Mana potion
      await inventories.create({
        charId: char.charId,
        itemId: 6,
        quantity: 2,
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
      await charabilities.destroy({ where: { charId: char.charId } });
      await inventories.destroy({ where: { charId: char.charId } });
      await char.destroy();
      res.json({ success: "character deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "DB connection issue?" });
  }
});

module.exports = router;
