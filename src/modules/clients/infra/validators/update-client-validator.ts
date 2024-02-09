import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

class UpdateClientValidator {
  @IsString({ message: 'name is required' })
  @IsOptional()
  @ApiProperty({ required: true })
  name: string;

  @IsString({ message: 'email is required' })
  @IsOptional()
  @ApiProperty({ required: true })
  email: string;

  @IsString({ message: 'address is required' })
  @IsOptional()
  @ApiProperty({ required: true })
  address: string;
}

export { UpdateClientValidator };
