import { Singleton } from "utils/decorators/singleton";
import { SqlEntityRepository } from "@mikro-orm/knex";
import { UserEntity } from "./user.entity";
import { FilterQuery, RequiredEntityData } from "@mikro-orm/core";

@Singleton
class UserRepository extends SqlEntityRepository<UserEntity> {
  findOneEntry = async (data: FilterQuery<UserEntity>) => {
    return await this.findOne(
      Object.assign(data, {
        isDeleted: false,
      }),
    );
  };

  async createUser(data: RequiredEntityData<UserEntity>): Promise<UserEntity> {
    const userEntity = new UserEntity();
    Object.entries(data).forEach((entry) => {
      userEntity[entry[0]] = entry[1];
    });

    const user = this.create(data);
    await this.persistAndFlush(user);

    return user;
  }
}

export default UserRepository;
