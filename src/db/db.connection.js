import { createClient } from "@libsql/client";
import env from "dotenv";

env.config();
export const connection = createClient({
  url: process.env.URL,
  authToken: process.env.TOKEN,
});
 