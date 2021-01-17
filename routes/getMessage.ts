import express from "express";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.get("/:id", checkAuth,(req, res) => {
  let db = getDb();
  let id = req.params.id;
  //let user = req.params.user;

  db.query(
    "SELECT * FROM message WHERE id = $1;",
    [id]
  )
    .then((data) => {
      if (data.rowCount === 1) {
        res.status(200).json(data.rows[0]);
      } else {
        res.status(404).json({ message: "No message with this id found." });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "Error while query." });
    });
});

export default router;
