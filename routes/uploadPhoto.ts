import express from "express";
import { Client } from "pg";
import { getDb } from "../db";
import { checkAuth } from "../util/checkAuth";

const router = express.Router();

router.post("/",checkAuth, (req: any, res) => {
  let photo = req.body;
  photo.uploaded_by = req.user.username;
  // let dirName = __dirname.replace("routes","");
  // let url = dirName+"profilBilder/"+photo.url;
  // photo.url =  url;
  let db = getDb();

  db.query("UPDATE photo SET url=$1 WHERE uploaded_by = $2;", [
    photo.url,
    photo.uploaded_by,
  ])
    .then((data) => {
      res.status(200).json({ message: "Added row" });
    })
    .catch((error) => {
      res.status(404).json({ message: "Problems" });
    });
});

export default router;
