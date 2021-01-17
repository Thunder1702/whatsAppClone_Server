import express from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const bcrypt = require('bcrypt');

const privateKEY = fs.readFileSync(
  path.join(__dirname, "../private.key"),
  "utf8"
);

const router = express.Router();
import { getDb } from "../db";

router.post("/", (req, res) => {
  let user = req.body;
  let db = getDb();
  console.log(user);

  if (!user.name && !user.password) {
    res.sendStatus(403);
    return;
  }
  db.query("SELECT * FROM users WHERE name = $1", [
    user.name
  ]).then((data) => {
    console.log(user.password);
    bcrypt.compare(user.password, data.rows[0].password,(err: any, response: any) => {
      if (err) {
        console.log(err);
        res.status(404).json({ message: "false" });
      } if (res) {
        const token = jwt.sign(
          {
            user: user.name,
          },
          privateKEY,
          {
            expiresIn: "1h",
          }
        );
        res.json({
          token: token,
        });
      }
    });
  }).catch((error: any) => {
    console.log(error);

    res.status(400).json({ message: "ERROR" });
  });

});

export default router;
