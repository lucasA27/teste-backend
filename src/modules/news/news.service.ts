import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { GetNewsFilterDto } from './dto/get-news-filter.dto';
import { NEWS_REPOSITORY } from './interfaces/news-repository.interface';
import type { INewsRepository } from './interfaces/news-repository.interface';

@Injectable()
export class NewsService {
  constructor(
    @Inject(NEWS_REPOSITORY)
    private readonly newsRepository: INewsRepository,
  ) {}

  create(createNewsDto: CreateNewsDto) {
    return this.newsRepository.create(createNewsDto);
  }

  findAll(filterDto: GetNewsFilterDto) {
    return this.newsRepository.findAll(filterDto);
  }

  async findOne(id: number) {
    const news = await this.newsRepository.findOne(id);
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    return this.newsRepository.update(id, updateNewsDto);
  }

  async remove(id: number) {
    return this.newsRepository.remove(id);
  }
}
