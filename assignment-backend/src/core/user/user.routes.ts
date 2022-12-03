import { Application } from "express";
import ValidationMiddleware from "../../middlewares/validation.middleware";
import { User } from "./user.dto";
import UserController from "./user.controller";

const userRoutes = (app: Application) => {
  const userController = new UserController();
  app.route("/v1/user").post(ValidationMiddleware(User), userController.create);
  app.route("/v1/user/:id").put(ValidationMiddleware(User), userController.update);
  app.route("/v1/user/:id").delete(userController.delete);
  app.route("/v1/users").get(userController.findAll);
  app.route("/v1/users/:id").get(userController.findOne);
};

export default userRoutes;
