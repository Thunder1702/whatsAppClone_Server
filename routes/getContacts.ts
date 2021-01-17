import express from "express";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.get("/",checkAuth, (req, res) => {
  let db = getDb();
  db.query("SELECT * FROM contact;")
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
