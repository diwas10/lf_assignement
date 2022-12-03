import { IsDateString, IsEmail, IsNotEmpty, Length } from "class-validator";

export class Patient {
  @IsNotEmpty({ message: "Full Name is Required." })
  fullName: string;

  @IsNotEmpty({ message: "Email is Required." })
  @IsEmail({}, { message: "Invalid Email" })
  email: string;

  @IsNotEmpty({ message: "Contact Number is Required." })
  @Length(10, 10, { message: "Contact Number must be of length 10" })
  contactNumber: string;

  @IsNotEmpty({ message: "Date of Birth is Required." })
  @IsDateString(null, { message: "Invalid Date of Birth" })
  dob: string;

  @IsNotEmpty({ message: "Address is Required" })
  address: string;
}
