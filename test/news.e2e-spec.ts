import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('News (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    // Create a user and login to get token
    const userDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    await request(app.getHttpServer()).post('/auth/register').send(userDto);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: userDto.email, password: userDto.password });

    authToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /news', () => {
    it('should create a new news with valid data', () => {
      const createNewsDto = {
        title: 'Nova Noticia',
        description: 'Descricao da nova noticia',
      };

      return request(app.getHttpServer())
        .post('/news')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createNewsDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toEqual(createNewsDto.title);
          expect(res.body.description).toEqual(createNewsDto.description);
        });
    });

    it('should fail to create a news with invalid data (missing title)', () => {
      const createNewsDto = {
        description: 'Descricao sem titulo',
      };

      return request(app.getHttpServer())
        .post('/news')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createNewsDto)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('title should not be empty');
          expect(res.body.message).toContain('title must be a string');
        });
    });

    it('should fail to create a news with extra fields', () => {
      const createNewsDto = {
        title: 'Titulo',
        description: 'Descricao',
        extra: 'Campo extra',
      };

      return request(app.getHttpServer())
        .post('/news')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createNewsDto)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('property extra should not exist');
        });
    });
  });
});
