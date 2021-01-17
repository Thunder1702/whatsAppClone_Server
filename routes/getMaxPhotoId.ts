import express from "express";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.get("/", checkAuth,(req, res) => {
    let db = getDb();

    db.query(
        "SELECT MAX(id) FROM photo;")
        .then((data) => {
            if (data.rowCount == 1) {
                res.status(200).json(data.rows[0].max);
          } else {
            res.status(404).json({ message: "No photo with this Max id found." });
          }
        })
        .catch((error) => {
          res.status(400).json({ message: "Error while query." });
        });
});

export default router;