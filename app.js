const express = require("express");
const mongoose = require("mongoose");
const settings = require("./config/settings");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const financeRouter = require("./routes/financeRoute");

mongoose.connect(
  settings.dbpath,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Conectou o banco... Pronto para uso")
);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(financeRouter);

app.use((req, res) => {
  res.type("application/json");
  res.status(404).send({ output: "Page Not Found" });
});

app.listen(3001, () => "Server on port 3001");
