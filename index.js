const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Routers
const userRouter = require("./routes/users");
app.use("/users", userRouter);
const charRouter = require("./routes/characters");
app.use("/character", charRouter);

const port = process.env.MYSQLPORT;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
});
