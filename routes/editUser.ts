import express from "express";
import { Client } from "pg";
const router = express.Router();
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

router.put("/",checkAuth, (req, res) => {
  let user = req.body;
  let db = getDb();

  checkValidity(user, db)
    .then(() => {
      db.query("UPDATE users SET profilbild= $1,status=$2 WHERE name = $3", [
        user.profilbild,
        user.status,
        user.name,
      ])
        .then((data: any) => {
          res.status(200).json({ message: "Updated row" });
        })
        .catch((error: any) => {
          res.status(404).json({ message: "Could not be updated." });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "There exists no entry with this Username or invalid input.",
      });
    });
});

function checkValidity(user: any, db: Client) {
  return new Promise<void>((resolve, reject) => {
    if (user.name && user.status && user.profilbild) {
      db.query("SELECT * FROM users WHERE name = $1;", [user.name])
        .then((data) => {
          if ((data.rowCount = 1)) {
            resolve();
          } else {
            reject();
          }
        })
        .catch((error) => {
          console.log("No one with this id found in DB");
        });
    } else {
      reject();
    }
  });
}

export default router;
