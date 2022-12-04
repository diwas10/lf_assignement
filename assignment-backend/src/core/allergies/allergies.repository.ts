import { FilterQuery, RequiredEntityData } from "@mikro-orm/core";
import { SqlEntityRepository } from "@mikro-orm/knex";
import { Singleton } from "utils/decorators/singleton";
import { AllergiesEntity } from "./allergies.entity";

@Singleton
class AllergiesRepository extends SqlEntityRepository<AllergiesEntity> {
  findOneEntry = async (data: FilterQuery<AllergiesEntity>) => {
    return await this.findOne({
      ...(data as any),
      isDeleted: false,
    });
  };

  createAllergy = async (data: RequiredEntityData<AllergiesEntity>) => {
    const allergy = new AllergiesEntity();
    Object.entries(data).forEach((entry) => {
      allergy[entry[0]] = entry[1];
    });

    await this.persistAndFlush(allergy);

    return allergy;
  };
}

export default AllergiesRepository;
