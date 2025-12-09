import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersTypeOrmRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly typeOrmRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.typeOrmRepository.create(createUserDto);
    return this.typeOrmRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.typeOrmRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'createdAt'],
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.typeOrmRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'createdAt'],
    });
  }
}
