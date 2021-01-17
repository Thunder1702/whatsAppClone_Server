import { Client } from "pg";
import dotenv from  "dotenv";
dotenv.config();

let client: Client;

export function initDb() {
  client = new Client({
    host: process.env.database_host,
    user: process.env.database_user,
    password:process.env.database_password,
    database:process.env.database_db,
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
