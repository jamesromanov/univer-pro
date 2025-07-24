const express = require("express");
const fs = require("fs");
const Joi = require("joi");

const dataValidator = Joi.object({
  fullName: Joi.string().required().min(4).max(50),
  universityName: Joi.string().required().min(4).max(70),
});
const app = express();

app.use(express.json());
app.get("/", (req, res, next) => res.send("Application is running"));
app.get("/users", async (req, res, next) => {
  const file = JSON.parse(fs.readFileSync("./db.json")) ?? [];
  res.status(200).json(file);
});

app.post("/users", async (req, res, next) => {
  const file = fs.readFileSync("./db.json", "utf-8");
  const data = req.body;
  const { value, error } = dataValidator.validate(data);
  if (error) return res.status(409).json(error.details[0].message);

  const writeData = JSON.parse(file);

  fs.writeFileSync(
    "./db.json",
    JSON.stringify(
      writeData.length ? writeData.concat(value) : [].concat(value)
    ),
    "utf-8"
  );
  res.send("succesfully added");
});
app.listen(3001, () => {
  console.log("application is running on some port");
});
