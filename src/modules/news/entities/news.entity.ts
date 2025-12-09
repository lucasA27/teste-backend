import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class News {
  @ApiProperty({ example: 1, description: 'O identificador único da notícia' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Título da Notícia',
    description: 'O título da notícia',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'Descrição da Notícia',
    description: 'A descrição da notícia',
  })
  @Column()
  description: string;

  @ApiProperty({ description: 'Data de criação do registro' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização do registro' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'Data de exclusão (Soft Delete)' })
  @DeleteDateColumn()
  deletedAt: Date;
}
