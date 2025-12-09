import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetNewsFilterDto {
  @ApiPropertyOptional({ description: 'Página atual', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Itens por página', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Filtrar por título' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Filtrar por descrição' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Campo para ordenação (id, title, createdAt)',
    enum: ['id', 'title', 'description', 'createdAt'],
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({
    description: 'Direção da ordenação (ASC, DESC)',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC' = 'DESC';
}
