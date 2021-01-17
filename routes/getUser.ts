import express, { RequestHandler, RequestParamHandler } from "express";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.get("/", checkAuth, (req: any, res) => {
  let db = getDb();
  let userName = req.user.username;
  db.query("SELECT * FROM users WHERE name = $1;", [userName])
    .then((data) => {
      if ((data.rowCount = 1)) {
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
