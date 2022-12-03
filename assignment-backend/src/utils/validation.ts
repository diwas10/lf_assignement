import { validateOrReject } from "class-validator";
import BadRequestException from "@utils/exceptions/bad-request.exception";

export async function validateClassSchema<T extends Class>(Schema: T, data: any) {
  const schema = new Schema();
  Object.entries(data).forEach((key) => {
    schema[key[0]] = key[1];
  });
  try {
    await validateOrReject(schema);
  } catch (err) {
    throw new BadRequestException(err, "Invalid Request Data sent in Body");
  }
}
