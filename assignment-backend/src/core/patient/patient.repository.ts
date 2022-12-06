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
        select p.full_name          as "fullName",
               p.id,
               p.address,
               p.dob,
               p.email,
               p.profile_image as "profileImage",
               p.contact_number     as "contactNumber",
               nullif(json_agg((json_strip_nulls(json_build_object('id', a.id, 'name', a.name))))::text,
                      '[{}]')::json as allergies
        from patient p
                 full join patient_allergies pa on p.id = pa.patient_entity_id
                 full join allergies a on a.id = pa.allergies_entity_id
        where p.is_deleted = false
        group by p.id;`);
  };
}

export default PatientRepository;
