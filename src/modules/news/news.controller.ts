import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { GetNewsFilterDto } from './dto/get-news-filter.dto';
import { News } from './entities/news.entity';

@ApiTags('noticias')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova notícia' })
  @ApiResponse({
    status: 201,
    description: 'A notícia foi criada com sucesso.',
    type: News,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar notícias com paginação e filtros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de notícias retornada com sucesso.',
  })
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() filterDto: GetNewsFilterDto,
  ): Promise<{ data: News[]; total: number; page: number; limit: number }> {
    return this.newsService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma notícia pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Notícia encontrada.',
    type: News,
  })
  @ApiResponse({ status: 404, description: 'Notícia não encontrada.' })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<News> {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma notícia' })
  @ApiResponse({
    status: 200,
    description: 'Notícia atualizada com sucesso.',
    type: News,
  })
  @ApiResponse({ status: 404, description: 'Notícia não encontrada.' })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsDto: UpdateNewsDto,
  ): Promise<News> {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma notícia' })
  @ApiResponse({ status: 204, description: 'Notícia removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Notícia não encontrada.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.newsService.remove(id);
  }
}
