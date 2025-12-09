import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    description: 'O título da notícia',
    example: 'Nova descoberta científica',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'A descrição detalhada da notícia',
    example: 'Cientistas descobriram um novo planeta habitável...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
