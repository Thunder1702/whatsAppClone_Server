import express from "express";
import { Client } from "pg";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.put("/", checkAuth, (req: any, res) => {
  let contact = req.body;
  let user = req.user.username;
  contact.users_contact = user;

  let db = getDb();

  db.query(
    "UPDATE contact SET first_name= $1,last_name=$2 WHERE users_contact = $3 AND contact_username = $4",
    [
      contact.first_name,
      contact.last_name,
      contact.users_contact,
      contact.contact_username
    ]
  )
    .then((data) => {
      res.status(200).json({ message: "Updated row" });
    })
    .catch((error) => {
      res.status(404).json({ message: "Could not be updated." });
    });

});

export default router;
