import { Allergies } from "./allergies.dto";
import { Singleton } from "@utils/decorators/singleton";
import AllergiesRepository from "./allergies.repository";
import { AllergiesEntity } from "./allergies.entity";
import { Mikro } from "app";
import { getContextUser } from "@utils/utility";
import HttpException from "@utils/exceptions/http.exception";
import { wrap } from "@mikro-orm/core";

@Singleton
class AllergiesService {
  private readonly allergiesRepository: AllergiesRepository;
  private readonly user: ContextUser;

  constructor() {
    this.allergiesRepository = Mikro.em.getRepository(AllergiesEntity);
    this.user = getContextUser();
  }

  findOneAllergyOrFail = async (id: number) => {
    const allergy = await this.allergiesRepository.findOneEntry({ id });
    if (!allergy) throw new HttpException(404, "Allergy Not Found");

    return allergy;
  };

  findAll = async () => await this.allergiesRepository.find({ isDeleted: false });

  findOne = async (id: number) => await this.findOneAllergyOrFail(id);

  create = async (allergiesData: Allergies) => {
    return await this.allergiesRepository.createAllergy(allergiesData);
  };

  update = async (id: number, allergiesData: Allergies) => {
    const allergy = await this.findOneAllergyOrFail(id);

    wrap(allergy).assign(allergiesData);
    await this.allergiesRepository.flush();

    return allergy;
  };

  delete = async (id: number) => {
    const allergy = await this.findOneAllergyOrFail(id);

    wrap(allergy).assign({ isDeleted: true });
    await this.allergiesRepository.flush();

    return {};
  };
}

export default AllergiesService;
