import express, { RequestHandler, RequestParamHandler } from "express";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.get("/:email", checkAuth, (req, res) => {
  let db = getDb();
  let contactEmail = req.params.email;
  db.query("SELECT * FROM users WHERE email = $1;", [contactEmail])
    .then((data) => {
      if ((data.rowCount == 1)) {
        res.status(200).json(data.rows[0].name);
      } else {
        res.status(404).json({ message: "No user with this email found." });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "ERROR" });
    });
});

export default router;
