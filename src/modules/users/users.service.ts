import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as usersRepositoryInterface from './interfaces/users-repository.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(usersRepositoryInterface.USERS_REPOSITORY)
    private readonly usersRepository: usersRepositoryInterface.IUsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userToCreate = { ...createUserDto, password: hashedPassword };

    const { password, ...result } =
      await this.usersRepository.create(userToCreate);
    return result;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: number) {
    return this.usersRepository.findById(id);
  }
}
