import { IsNotEmpty, IsString } from "class-validator";

export class Allergies {
  @IsNotEmpty({ message: "Name is Required" })
  @IsString()
  name: string;
}
