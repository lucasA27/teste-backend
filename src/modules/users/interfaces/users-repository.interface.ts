import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface IUsersRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
}
