import AuthService from "./auth.service";
import { SuccessRes } from "@utils/response";
import { Login } from "./auth.dto";
import { Singleton } from "@utils/decorators/singleton";

@Singleton
class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request<Login>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.authService.login(req.body),
      message: `User Logged in Successfully`,
    });
  };

  register = async (req: Request<Login>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.authService.register(req.body),
      message: "User Registered in Successfully.",
    });
  };

  refreshAccessToken = async (req: Request, res: Response) => {
    const token = req.get("Authorization");
    return SuccessRes(res, 200, {
      data: await this.authService.refreshAccessToken(token),
      message: "Access Token Refreshed Successful.",
    });
  };

  logout = async (req: Request, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.authService.logout(),
      message: "Logged out Successful.",
    });
  };
}

export default AuthController;
