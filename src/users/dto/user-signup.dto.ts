import { IsNotEmpty, IsString } from 'class-validator';
import { UserSigninDto } from './user-signin.dto';

export class UserSignupDto extends UserSigninDto {
  @IsNotEmpty({ message: 'Name can not be null.' })
  @IsString({ message: 'Name should be string.' })
  name: string;
}
