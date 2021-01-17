import express from "express";
import { Client } from "pg";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

function checkValidity(contact: any, db: Client) {
  return new Promise<void>((resolve, reject) => {
    if (
      contact.phone_number &&
      contact.first_name &&
      contact.last_name &&
      contact.email &&
      contact.users_contact &&
      contact.contact_username
    ) {
      db.query("SELECT * FROM contact WHERE phone_number = $1 OR email = $2;", [
        contact.phone_number, contact.email
      ])
        .then((data) => {
          if (data.rowCount > 0) {
            reject();
          } else {
            resolve();
          }
        })
        .catch((error) => {
          console.log("ERROR");
        });
    } else {
      console.log("ERROR WHILE IF");
      reject();
    }
  });
}

router.post("/", checkAuth,(req: any, res) => {
  let contact = req.body;
  let user = req.user.username;
  contact.users_contact = user;
  let db = getDb();

  checkValidity(contact, db)
    .then(() => {
      db.query("INSERT INTO contact VALUES ($1,$2,$3,$4,$5,$6);", [
        contact.first_name,
        contact.last_name,
        contact.email,
        contact.phone_number,
        contact.users_contact,
        contact.contact_username
      ])
        .then((data) => {
          res.status(200).json({ message: "Added row" });
        })
        .catch((error) => {
          res.status(404).json({ message: "Problems" });
        });
    })
    .catch((error) => {
      res
        .status(404)
        .json({ message: "Row allready exists with this phone_number." });
    });
});

export default router;
