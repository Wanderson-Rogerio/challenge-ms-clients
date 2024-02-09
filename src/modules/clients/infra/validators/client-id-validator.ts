import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ClientIdValidator {
  @IsString({ message: 'user id is required' })
  @ApiProperty({ required: true })
  client_id: string;
}

export { ClientIdValidator };
