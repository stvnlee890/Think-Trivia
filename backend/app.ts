import express from "express";
import { UserController } from "./controllers/user.controller.ts";
import { CategoryController } from "./controllers/category.controller.ts";

class App {
  public express: express.Application;
  public userController: UserController;
  public categoryController: CategoryController

  constructor() {
    this.express = express();
    this.userController = new UserController();
    this.categoryController = new CategoryController()
    this.middleware();
    this.userRoutes();
    this.categoryRoutes()
  }

  private middleware() {
    this.express.use(express.urlencoded({ extended: true }));
  }

  private categoryRoutes() {
    this.express.post('/api/category', (req, res) => {
        this.categoryController.createCategory(req.body).then((data) => res.json(data))
    })
  }

  private userRoutes() {
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
