import { Application } from "express";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";
import patientRoutes from "@core/patient/patient.routes";

const initRoutes = (app: Application) => {
  authRoutes(app);
  userRoutes(app);
  patientRoutes(app);
};

export default initRoutes;
