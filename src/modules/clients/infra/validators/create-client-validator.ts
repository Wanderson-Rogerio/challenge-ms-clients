import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsString } from 'class-validator';

class CreateClientValidator {
  @IsString({ message: 'name is required' })
  @ApiProperty({ required: true })
  name: string;

  @IsString({ message: 'email is required' })
  @ApiProperty({ required: true })
  email: string;

  @IsString({ message: 'address is required' })
  @ApiProperty({ required: true })
  address: string;

  @IsString({ message: 'password is required' })
  @ApiProperty({ required: true })
  password: string;

  @IsOptional()
  @IsString({ message: '' })
  @ApiProperty({ required: false })
  profile_picture?: string;
}

export { CreateClientValidator };
