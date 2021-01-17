import express, { RequestHandler, RequestParamHandler } from "express";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.get("/:contactUsername", checkAuth, (req: any, res) => {
  let db = getDb();
  let contactUsername = req.params.contactUsername;
  db.query("SELECT * FROM contact WHERE contact_username = $1;", [contactUsername])
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
