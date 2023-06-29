import * as bodyParser from "body-parser";
import express from "express";
import { UserController } from "./controllers/user.controller.ts";
console.log("HERE")
class App {
  public express: express.Application;
  public userController: UserController;

  constructor() {
    this.express = express();
    this.userController = new UserController();
    this.middleware()
    this.routes()
  }

  private middleware() {
    this.express.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    this.express.get("/api/user/:id", (req, res) => {
      this.userController.getUser(req.params.id).then((data) => res.json(data));
    });

    this.express.get("/api/userCategory/:id", (req, res) => {
      this.userController
        .getUserCategory(req.params.id)
        .then((data) => res.json(data));
    });

    this.express.post("/api/user", (req, res) => {
      this.userController.createUser(req.body).then((data) => res.json(data));
    });

    this.express.put("/api/userCategory/:uId/:cId", (req, res) => {
      this.userController
        .setUserCategory(req.params.uId, req.params.cId)
        .then((data) => res.json(data));
    });
  }
}

export default new App().express;
