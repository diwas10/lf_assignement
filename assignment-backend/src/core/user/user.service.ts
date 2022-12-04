import { User } from "./user.dto";
import HttpException from "@utils/exceptions/http.exception";
import UserRepository from "./user.repository";
import { Singleton } from "@utils/decorators/singleton";
import { UserEntity } from "./user.entity";
import { Mikro } from "../../app";
import { generatePassword } from "@utils/utility";
import { wrap } from "@mikro-orm/core";
import { hashPassword } from "@utils/bcrypt";

@Singleton
class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = Mikro.em.getRepository(UserEntity);
  }

  private findUserOrFail = async (id: string) => {
    const user = await this.userRepository.findOne({ id } as any, {
      populate: ["id", "isPermanent", "email", "createdAt", "createdBy", "updatedAt", "updatedBy"],
    });
    if (!user) throw new HttpException(400, "User does not Exist.");

    if (user.isPermanent)
      throw new HttpException(400, "Cannot Perform Delete Operation for this user");
    return user;
  };

  findAll = async () => await this.userRepository.findAll();

  findOne = async (id: string) => await this.userRepository.findOne({ id } as any);

  create = async (userData: User) => {
    const findUser = await this.userRepository.findOneEntry({ email: userData.email });
    if (findUser) throw new HttpException(400, "User with Email Already Exists.");

    const password = generatePassword();

    return await this.userRepository.createUser({
      ...userData,
      password: await hashPassword(password),
    });
  };

  update = async (id: string, userData: User) => {
    const user = await this.findUserOrFail(id);

    const userWithNewEmail = await this.userRepository.findOne({ email: userData.email } as any);
    if (userWithNewEmail && userWithNewEmail.id !== id)
      throw new HttpException(400, "User with Email Already Exists");

    const data = wrap(user).assign(userData);
    await this.userRepository.flush();

    return data;
  };

  async delete(id: string) {
    const user = await this.findUserOrFail(id);
    await wrap(user).assign({ ...user, isDeleted: true });
    await this.userRepository.flush();
  }
}

export default UserService;
