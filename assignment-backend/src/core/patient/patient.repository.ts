import { FilterQuery, RequiredEntityData } from "@mikro-orm/core";
import { SqlEntityRepository } from "@mikro-orm/knex";
import { Singleton } from "utils/decorators/singleton";
import { PatientEntity } from "./patient.entity";
import { AllergiesEntity } from "@core/allergies/allergies.entity";

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
      if (entry[0] !== "allergies") patientEntity[entry[0]] = entry[1];
    });

    if (data.allergies) {
      const allergies = data.allergies as string[];

      for (const allergy of allergies) {
        const allergyReference = this.em.getReference(AllergiesEntity, Number(allergy));
        patientEntity.allergies.add(allergyReference);
      }
    }

    await this.persistAndFlush(patientEntity);

    return patientEntity;
  }

  findAllSortedByUrgency = async () => {
    // const qb = this.createQueryBuilder();
    // return qb.select("*").where({ isDeleted: false }).orderBy({ isUrgent: QueryOrder.desc });

    return await this.em.execute(`
        select p.full_name                                             as "fullName",
               p.id,
               p.address,
               p.dob,
               p.email,
               p.contact_number                                        as "contactNumber",
               p.profile_image                                         as "profileImage",
               json_agg(json_build_object('id', a.id, 'name', a.name)) as "allergies"
        from patient p
                 inner join patient_allergies pa on p.id = pa.patient_entity_id
                 inner join allergies a on a.id = pa.allergies_entity_id
        where a.is_deleted = false
        group by pa.patient_entity_id, p.id`);
  };
}

export default PatientRepository;
