import { Application } from "express";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";
import patientRoutes from "@core/patient/patient.routes";
import allergiesRoutes from "@core/allergies/allergies.routes";

const initRoutes = (app: Application) => {
  authRoutes(app);
  userRoutes(app);
  patientRoutes(app);
  allergiesRoutes(app);
};

export default initRoutes;
