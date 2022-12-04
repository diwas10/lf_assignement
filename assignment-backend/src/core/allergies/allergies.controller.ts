import { SuccessRes } from "@utils/response";
import { Allergies } from "./allergies.dto";
import AllergiesService from "./allergies.service";
import { Singleton } from "@utils/decorators/singleton";

@Singleton
class AllergiesController {
  private readonly allergiesService: AllergiesService;

  constructor() {
    this.allergiesService = new AllergiesService();
  }

  create = async (req: Request<Allergies>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.allergiesService.create(req.body),
      message: `Allergy added in Successfully`,
    });
  };

  update = async (req: Request<Allergies, { id: string }>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.allergiesService.update(Number(req.params.id), req.body),
      message: `Allergy Updated in Successfully`,
    });
  };

  delete = async (req: Request<null, { id: string }>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.allergiesService.delete(Number(req.params.id)),
      message: `Allergy Deleted in Successfully`,
    });
  };

  findOne = async (req: Request<null, { id: string }>, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.allergiesService.findOne(Number(req.params.id)),
      message: `Allergy Fetched in Successfully`,
    });
  };

  findAll = async (req: Request, res: Response) => {
    return SuccessRes(res, 200, {
      data: await this.allergiesService.findAll(),
      message: `Allergy List Fetched in Successfully`,
    });
  };
}

export default AllergiesController;
