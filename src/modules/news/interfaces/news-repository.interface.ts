import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';
import { GetNewsFilterDto } from '../dto/get-news-filter.dto';
import { News } from '../entities/news.entity';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface INewsRepository {
  create(createNewsDto: CreateNewsDto): Promise<News>;
  findAll(filterDto: GetNewsFilterDto): Promise<PaginatedResult<News>>;
  findOne(id: number): Promise<News | null>;
  update(id: number, updateNewsDto: UpdateNewsDto): Promise<News>;
  remove(id: number): Promise<void>;
}

export const NEWS_REPOSITORY = 'NEWS_REPOSITORY';

export const NOTICIAS_REPOSITORY = 'NOTICIAS_REPOSITORY';
