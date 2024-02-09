import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class AuthenticateClientValidator {
  @IsString({ message: 'email is required' })
  @ApiProperty({ required: true })
  email: string;

  @IsString({ message: 'password is required' })
  @ApiProperty({ required: true })
  password: string;
}

export { AuthenticateClientValidator };
