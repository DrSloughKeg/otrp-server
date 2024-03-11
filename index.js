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
const AiRouter = require("./routes/API");
app.use("/OpenAi", AiRouter);

const port = process.env.PORT;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
});
