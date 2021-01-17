import express from "express";
import { Client } from "pg";
const router = express.Router();
import { getDb } from "../db";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const bcrypt = require('bcrypt');

const privateKEY = fs.readFileSync(
  path.join(__dirname, "../private.key"),
  "utf8"
);

function checkValidity(user: any, db: Client) {



  let pr = new Promise<void>((resolve, reject) => {
    if (
      user.name && user.password && user.email) {

      db.query("SELECT * FROM users WHERE name = $1 OR email = $2;", [user.name, user.email])
        .then((data) => {
          if (data.rowCount > 0) {
            console.log("Bekommt mehr als eine Zeile zurück.");
            reject();
          } else {
            console.log("Funktioniert!!!!");
            resolve();
          }
        }).catch((error) => { console.log("ERROR"); });
    } else {
      console.log("Error beim Query, select hat nicht funktioniert!");
      reject();
    }
  });
  return pr;
}


router.post("/", (req, res) => {
  let user = req.body;

  let db = getDb();

  checkValidity(user, db)
    .then(() => {
      bcrypt.hash(user.password, 10, (err: any, hash: any) => {
        if (err) {
          console.log(err);
        } else {
          user.password = hash;
          db.query("INSERT INTO users VALUES ('','',$1,$2,$3);", [
            user.name,
            user.password,
            user.email

          ])
            .then((data) => {
              db.query("INSERT INTO photo VALUES ('', $1);",[user.name])
              .then((data) => {
                console.log("Added row in table photo.")
              }).catch((err)=>{
                console.log(err);
              })
              const token = jwt.sign(
                {
                  user: user.name,
                },
                privateKEY,
                {
                  expiresIn: "1h",
                }
              );
              //res.status(200).json({ message: "Added row" });
              res.json({
                token: token,
              });
            })
            .catch((error) => {
              res.status(404).json({ message: "Problems" });
            });
          //console.log(hash);
          // console.log(user.password);
        }

      });


    })
    .catch((error: any) => {
      res.status(404).json({ message: "Username or email allready exists." });
    });
});

export default router;
