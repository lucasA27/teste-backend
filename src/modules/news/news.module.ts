import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { NewsTypeOrmRepository } from './repositories/news.typeorm.repository';
import { NEWS_REPOSITORY } from './interfaces/news-repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
    CacheModule.register({
      ttl: 60000, // 60 seconds
    }),
  ],
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
