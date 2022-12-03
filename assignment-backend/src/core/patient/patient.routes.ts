import { Application } from "express";
import PatientController from "./patient.controller";
import fileUpload from "../../services/file-upload";

const patientRoutes = (app: Application) => {
  const patientController = new PatientController();
  app.route("/patient").post(fileUpload().single("profileImage"), patientController.create);
  app.route("/patient/:id").put(fileUpload().single("profileImage"), patientController.update);
  app.route("/patient/:id").delete(patientController.delete);
  app.route("/patient").get(patientController.findAll);
  app.route("/patient/:id").get(patientController.findOne);
};

export default patientRoutes;
