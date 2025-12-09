import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import {
  INewsRepository,
  PaginatedResult,
} from '../interfaces/news-repository.interface';
import { News } from '../entities/news.entity';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';
import { GetNewsFilterDto } from '../dto/get-news-filter.dto';

@Injectable()
export class NewsTypeOrmRepository implements INewsRepository {
  constructor(
    @InjectRepository(News)
    private readonly typeOrmRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const news = this.typeOrmRepository.create(createNewsDto);
    return this.typeOrmRepository.save(news);
  }

  async findAll(filterDto: GetNewsFilterDto): Promise<PaginatedResult<News>> {
    const {
      page = 1,
      limit = 10,
      title,
      description,
      sort,
      order = 'DESC',
    } = filterDto;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (title) {
      where.title = Like(`%${title}%`);
    }
    if (description) {
      where.description = Like(`%${description}%`);
    }

    const orderOption: any = {};
    if (sort) {
      const sortField = sort === 'nome' ? 'title' : sort;
      orderOption[sortField] = order;
    } else {
      orderOption.createdAt = 'DESC';
    }

    const [data, total] = await this.typeOrmRepository.findAndCount({
      where,
      take: limit,
      skip,
      order: orderOption,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<News | null> {
    return this.typeOrmRepository.findOneBy({ id });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<News> {
    const news = await this.findOne(id);
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    this.typeOrmRepository.merge(news, updateNewsDto);
    return this.typeOrmRepository.save(news);
  }

  async remove(id: number): Promise<void> {
    const news = await this.findOne(id);
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    await this.typeOrmRepository.softRemove(news);
  }
}
