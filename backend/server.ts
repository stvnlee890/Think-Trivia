require("dotenv").config();
import path from "path";
import express from "express";

import { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>HELLO</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("Express is listening to port", process.env.PORT);
});
