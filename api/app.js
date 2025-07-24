const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
app.get("/", (req, res, next) => res.send("Application is running"));
app.get("/users", async (req, res, next) => {
  const file = JSON.parse(fs.readFileSync("./db.json")) ?? [];
  res.status(200).json(file);
});

app.post("/users", async (req, res, next) => {
  const file = fs.readFileSync("./db.json", "utf-8");
  console.log(file);
  const data = req.body;
  const writeData = JSON.parse(file);

  fs.writeFileSync(
    "./db.json",
    JSON.stringify(writeData.length ? writeData.concat(data) : [].concat(data)),
    "utf-8"
  );
  res.send("succesfully added");
});
app.listen(3000);
