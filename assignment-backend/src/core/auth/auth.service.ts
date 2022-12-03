import { Login } from "./auth.dto";
import UserRepository from "@core/user/user.repository";
import { Mikro } from "app";
import { UserEntity } from "@core/user/user.entity";
import HttpException from "@utils/exceptions/http.exception";
import { compareHash, hashPassword } from "@utils/bcrypt";
import { signRefreshToken, signToken, validateToken } from "@utils/token";
import { Singleton } from "@utils/decorators/singleton";
import { getContextUser } from "@utils/utility";
import { FilterQuery } from "@mikro-orm/core";
import { JwtPayload } from "jsonwebtoken";

@Singleton
class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = Mikro.em.getRepository(UserEntity);
  }

  private findUserOrFail = async (where: FilterQuery<UserEntity>) => {
    const user = await this.userRepository.findOne(where);
    if (!user) throw new HttpException(400, "User does not Exist.");

    if (user.isPermanent) throw new HttpException(400, "Cannot Perform Operation for this user");
    return user;
  };

  /**
   *
   * @param password
   * @param email
   */
  login = async ({ password, email }: Login) => {
    const user = await this.findUserOrFail({ email });

    if (!user || !(await compareHash(password, user.password)))
      throw new HttpException(404, "User Not Found!");

    const token = signToken({ email }, user.id);
    const refreshToken = signRefreshToken({ email }, user.id);

    user.refreshToken = refreshToken;

    await this.userRepository.flush();

    return {
      user,
      accessToken: token,
      refreshToken,
    };
  };

  register = async ({ password, email }: Login) => {
    const findUser = await this.userRepository.findOne({ email });
    if (findUser) throw new HttpException(400, "User with this email already exists.");

    const user = await this.userRepository.createUser({
      email,
      password: await hashPassword(password),
    });

    const accessToken = signToken({ email }, user.id);
    const refreshToken = signRefreshToken({ email }, user.id);

    user.refreshToken = refreshToken;

    await this.userRepository.flush();

    return {
      user,
      accessToken,
      refreshToken,
    };
  };

  refreshAccessToken = async (refreshToken: string) => {
    const token = refreshToken.split("Bearer ")[1];

    const validate = validateToken(token, process.env.REFRESH_TOKEN_SECRET) as JwtPayload;
    if (!validate) throw new HttpException(401, "Unauthorized");

    const user = await this.userRepository.findOne({ refreshToken: token });
    if (!user) throw new HttpException(404, "Refresh Token is not assigned to any user.");

    const accessToken = signToken({ email: user.email }, user.id);
    const newRefreshToken = signRefreshToken({ email: user.email }, user.id);

    user.refreshToken = newRefreshToken;
    await this.userRepository.flush();
    return { accessToken, refreshToken: newRefreshToken };
  };

  logout = async () => {
    const user = await this.findUserOrFail({ id: getContextUser()?.id });
    user.refreshToken = null;
    await this.userRepository.flush();

    return null;
  };
}

export default AuthService;
