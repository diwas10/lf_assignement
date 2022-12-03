import { Application } from "express";
import AuthController from "./auth.controller";
import ValidationMiddleware from "../../middlewares/validation.middleware";
import { Login } from "./auth.dto";

const authRoutes = (app: Application) => {
  const authController = new AuthController();
  app.route("/v1/signup").post(ValidationMiddleware(Login), authController.register);
  app.route("/v1/login").post(ValidationMiddleware(Login), authController.login);

  app.route("/v1/auth/token/refresh").put(authController.refreshAccessToken);
  app.route("/v1/auth/logout").delete(authController.logout);
};

export default authRoutes;
