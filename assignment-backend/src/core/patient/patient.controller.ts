import { SuccessRes } from "@utils/response";
import { Patient } from "./patient.dto";
import PatientService from "./patient.service";
import { Singleton } from "@utils/decorators/singleton";

@Singleton
class PatientController {
  private readonly patientService: PatientService;

  constructor() {
    this.patientService = new PatientService();
  }

  create = async (req: Request<Patient>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.patientService.create(req.body, req.file),
      message: `Patient Saved in Successfully`,
    });
  };

  update = async (req: Request<Patient, { id: string }>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.patientService.update(Number(req.params.id), req.body, req.file),
      message: `Patient Updated in Successfully`,
    });
  };

  delete = async (req: Request<null, { id: string }>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.patientService.delete(Number(req.params.id)),
      message: `Patient Deleted in Successfully`,
    });
  };

  findOne = async (req: Request<null, { id: string }>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.patientService.findOne(Number(req.params.id)),
      message: `Patient Fetched in Successfully`,
    });
  };

  findAll = async (req: Request, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.patientService.findAll(),
      message: `Patient List Fetched in Successfully`,
    });
  };

  urgentStatus = async (req: Request<{ isUrgent: boolean }, { id: string }>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.patientService.urgentStatus(Number(req.params.id), req.body.isUrgent),
      message: `Patient Urgent Status Changed Successfully`,
    });
  };
}

export default PatientController;
