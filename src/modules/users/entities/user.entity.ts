import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'ID do usuário' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome do usuário' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
