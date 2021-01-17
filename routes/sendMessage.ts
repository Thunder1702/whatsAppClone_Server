import express from "express";
import { Client } from "pg";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

function checkValidity(message: any, db: Client) {
  return new Promise<void>((resolve, reject) => {
    console.log(message);
    if (
      message.id &&
      message.message_to &&
      message.message_from &&
      message.message_text 
    ) {
      db.query("SELECT * FROM message WHERE id = $1;", [message.id])
        .then((data) => {
          if (data.rowCount > 0) {
            console.log("Error no row found.")
            reject();
          } else {
            resolve();
          }
        })
        .catch((error) => {
          console.log("ERROR");
        });
    } else {
      console.log("Error while if");
      reject();
    }
  });
}

router.post("/",checkAuth,(req: any, res) => {
  let message = req.body;
  let username = req.user.username;
  message.message_from = username;
  console.log(message.message_from);
  let db = getDb();
 
  checkValidity(message, db)
    .then(() => {
      db.query("INSERT INTO message VALUES ($1,$2,$3,$4);", [
        message.id,
        message.message_to,
        message.message_from,
        message.message_text,
      ])
        .then((data) => {
          console.log ("erfolgreich hinzugefügt.");
          res.status(200).json({ message: "Added row" });
        })
        .catch((error) => {
          res.status(404).json({ message: "Problems" });
        });
    })
    .catch((error) => {
      res.status(404).json({ message: "Row allready exists with this id." });
    });
});

export default router;
