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

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
