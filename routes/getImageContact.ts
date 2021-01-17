import express from "express";
import { Client } from "pg";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.get("/:username",checkAuth, (req: any, res) => {
  let contactUsername = req.params.username;
  let db = getDb();

  db.query("SELECT url from photo WHERE uploaded_by = $1;",[contactUsername])
  .then((data) => {
      console.log( "geht");
      console.log(data.rows[0].url);
      res.status(200).json(data.rows[0].url);
  }).catch((err)=> {
      console.log("error with query");
      res.status(400).json("Problem with query.");
  })
});

export default router;
