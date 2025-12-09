import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersTypeOrmRepository } from './repositories/users.typeorm.repository';
import { USERS_REPOSITORY } from './interfaces/users-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: USERS_REPOSITORY,
      useClass: UsersTypeOrmRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
