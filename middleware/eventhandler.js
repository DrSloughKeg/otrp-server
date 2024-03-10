const { verify } = require("jsonwebtoken");

const validatePlayToken = (req, res, next) => {
  const playToken = req.header("playToken");

  if (!playToken) {
    return res.json({ error: "No character selected" });
  }
  try {
    const charToken = verify(playToken, process.env.TOKENKEY); //TO DO: change this to env

    if (charToken) {
      req.charToken = charToken;
      return next();
    }
  } catch (err) {
    return res.json({ error: err }); //400
  }
};

module.exports = { validatePlayToken };
