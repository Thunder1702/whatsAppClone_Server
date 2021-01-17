import { Client } from "pg";
let cfg = require("./config.json");

let client: Client;

export function initDb() {
  client = new Client({
    host: cfg.database.host,
    user: cfg.database.user,
    password: cfg.database.password,
    database: cfg.database.db,
  });
  return client.connect();
}

export function getDb(): Client {
  if (client !== undefined) {
    return client;
  } else {
    throw new Error("Db has not been initialized. Please call init first.");
  }
}
