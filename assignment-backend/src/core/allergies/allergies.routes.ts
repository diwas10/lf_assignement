import { Application } from "express";
import ValidationMiddleware from "../../middlewares/validation.middleware";
import { Allergies } from "./allergies.dto";
import AllergiesController from "./allergies.controller";

const allergiesRoutes = (app: Application) => {
  const allergiesController = new AllergiesController();
  app.route("/allergy").post(ValidationMiddleware(Allergies), allergiesController.create);
  app.route("/allergy/:id").put(ValidationMiddleware(Allergies), allergiesController.update);
  app.route("/allergy/:id").delete(allergiesController.delete);
  app.route("/allergy").get(allergiesController.findAll);
  app.route("/allergy/:id").get(allergiesController.findOne);
};

export default allergiesRoutes;
