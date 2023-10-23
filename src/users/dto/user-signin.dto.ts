import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserSigninDto {
  @IsNotEmpty({ message: 'Email can not be empty.' })
  @IsEmail({}, { message: 'Please a provide valid your email.' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty.' })
  @MinLength(8, { message: 'Password minimum character should be 8.' })
  password: string;
}
