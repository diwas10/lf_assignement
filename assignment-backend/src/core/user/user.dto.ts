import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class User {
  @IsNotEmpty({ message: "First Name is Required" })
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsNotEmpty({ message: "Last Name is Required" })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: "Email is Required" })
  @IsEmail({ message: "Invalid Email Address Provided" })
  email: string;

  @IsNotEmpty({ message: "Phone Number is required" })
  @Length(10, 10, { message: "Phone Number Must be of 10 digits." })
  phoneNumber: string;
}
