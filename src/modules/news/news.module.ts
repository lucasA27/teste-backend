import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { NewsTypeOrmRepository } from './repositories/news.typeorm.repository';
import { NEWS_REPOSITORY } from './interfaces/news-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [
    NewsService,
    {
      provide: NEWS_REPOSITORY,
      useClass: NewsTypeOrmRepository,
    },
  ],
})
export class NewsModule {}
