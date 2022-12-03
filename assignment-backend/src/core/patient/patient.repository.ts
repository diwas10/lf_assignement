import { FilterQuery, RequiredEntityData } from "@mikro-orm/core";
import { SqlEntityRepository } from "@mikro-orm/knex";
import { Singleton } from "utils/decorators/singleton";
import { PatientEntity } from "./patient.entity";

@Singleton
class PatientRepository extends SqlEntityRepository<PatientEntity> {
  findOneEntry = async (data: FilterQuery<PatientEntity>) => {
    return await this.findOne({
      ...(data as any),
      isDeleted: false,
    });
  };

  async createPatient(data: RequiredEntityData<PatientEntity>): Promise<PatientEntity> {
    const patientEntity = new PatientEntity();
    Object.entries(data).forEach((entry) => {
      patientEntity[entry[0]] = entry[1];
    });

    const patient = this.create(data);
    await this.persistAndFlush(patient);

    return patient;
  }
}

export default PatientRepository;
