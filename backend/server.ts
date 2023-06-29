import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import { seed } from "./seed.ts";
import { Category } from "./models/category.ts";
import { Request, Response } from "express";
import { connect } from "./config/db.config.ts";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>HELLO</h1>");
});

app.get("/seed", async (req: Request, res: Response) => {
  connect()
  const deleteDb = await Category.deleteMany({});
  console.log(`Removed ${deleteDb.deletedCount} objects`);
  const insertDb = await Category.insertMany(seed);
  console.log(`Added ${insertDb.length} objects`);
  res.json(insertDb);
});

app.listen(process.env.PORT, () => {
  console.log("Express is listening to port", process.env.PORT);
});
