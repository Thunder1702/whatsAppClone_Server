import express from "express";
import { Client } from "pg";
const router = express.Router();
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

function checkIfExists(user: any,contact_username:any, db: Client) {
  return new Promise<void>((resolve, reject) => {
    db.query("SELECT * FROM contact WHERE users_contact = $1 AND contact_username=$2;", [
      user,
      contact_username
    ])
      .then((data: any) => {
        if ((data.rowCount == 1)) {
          resolve();
        } else {
          reject();
        }
      })
      .catch((error) => {
        console.log("No contact found in DB");
      });
  });
}

router.delete("/:username",checkAuth, (req: any, res) => {
  let username = req.params.username;
  let user = req.user.username;
  let db = getDb();
  checkIfExists(user,username, db)
    .then(() => {
      db.query("DELETE FROM contact WHERE users_contact = $1 AND contact_username=$2", [user,username])
        .then((data: any) => {
          res.status(200).json({ message: "Deleted row" });
        })
        .catch((error: any) => {
          res.status(404).json({ message: "Could not be deleted." });
        });
    })
    .catch((error) => {
      res.status(404).json({ message: "There exists no entry." });
    });
});

export default router;
