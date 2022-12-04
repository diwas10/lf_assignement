import { Patient } from "./patient.dto";
import { Singleton } from "@utils/decorators/singleton";
import PatientRepository from "./patient.repository";
import { PatientEntity } from "./patient.entity";
import { Mikro } from "app";
import { getContextUser } from "@utils/utility";
import { FilterQuery, wrap } from "@mikro-orm/core";
import HttpException from "@utils/exceptions/http.exception";
import { validateClassSchema } from "@utils/validation";

@Singleton
class PatientService {
  private readonly patientRepository: PatientRepository;
  private readonly user: ContextUser;

  constructor() {
    this.patientRepository = Mikro.em.getRepository(PatientEntity);
    this.user = getContextUser();
  }

  findPatientOrFail = async (data: FilterQuery<PatientEntity>) => {
    const patient = await this.patientRepository.findOneEntry(data);
    if (!patient) throw new HttpException(404, "Patient Not Found.");

    return patient;
  };

  findAll = async () => await this.patientRepository.findAllSortedByUrgency();

  findOne = async (id: number) => await this.patientRepository.findOneEntry({ id });

  create = async (patientData: Patient, file: Express.Multer.File) => {
    await validateClassSchema(Patient, patientData);

    if (file) Object.assign(patientData, { profileImage: file.path });

    return await this.patientRepository.createPatient({
      ...patientData,
      isUrgent: patientData.isUrgent === "true",
    });
  };

  update = async (id: number, patientData: Patient, file: Express.Multer.File) => {
    const patient = await this.findPatientOrFail({ id });
    await validateClassSchema(Patient, patientData);

    if (file) Object.assign(patientData, { profileImage: file.path });

    const updatedPatient = wrap(patient).assign({
      ...patientData,
      isUrgent: patientData.isUrgent === "true",
    });
    await this.patientRepository.flush();
    return updatedPatient;
  };

  delete = async (id: number) => {
    const user = await this.findPatientOrFail({ id });
    await wrap(user).assign({ ...user, isDeleted: true });
    await this.patientRepository.flush();
    return {};
  };

  urgentStatus = async (id: number, isUrgent) => {
    const user = await this.findPatientOrFail({ id });
    await wrap(user).assign({ ...user, isUrgent });
    await this.patientRepository.flush();
    return {};
  };
}

export default PatientService;
