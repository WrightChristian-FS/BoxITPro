const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const userRoutes = require("./routes/users");
const assetRoutes = require('./routes/assets');

const app = express();
const PORT = 4800;

app.use(bodyParser.json()); 

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", userRoutes);
app.use("/api" , assetRoutes);


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
