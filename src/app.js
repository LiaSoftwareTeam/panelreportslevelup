import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.set("json spaces", 3)
export default app;
