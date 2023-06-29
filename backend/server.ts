import dotenv from "dotenv";
dotenv.config();
import App from './app.ts'
import { Request, Response } from "express";

App.get("/", (req: Request, res: Response) => {
  res.send("<h1>HELLO</h1>");
});

App.listen(process.env.PORT, () => {
  console.log("Express is listening to port", process.env.PORT);
});

