import express from "express";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.get("/:contactUsername",checkAuth, (req: any, res) => {
  let db = getDb();
  let user = req.user.username;
  console.log(user);
  let contact_username = req.params.contactUsername;
  db.query(
    "SELECT m.id,m.message_text,m.message_to,m.message_from FROM contact c, message m WHERE c.users_contact = $1 AND c.contact_username = $2 AND ((m.message_to = $3 AND m.message_from = $4) OR (m.message_to = $5 AND m.message_from = $6));",
    [user, contact_username, user, contact_username, contact_username, user]
  )
    .then((data) => {
      if (data.rowCount > 0) {
        res.status(200).json(data.rows);
      } else {
        res.status(404).json({ message: "No contact found." });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "ERROR" });
    });
});

export default router;
