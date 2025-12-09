import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ViaCepResponseDto } from './dto/viacep-response.dto';

@Injectable()
export class ViaCepService {
  constructor(private readonly httpService: HttpService) {}

  async getAddressByCep(cep: string): Promise<ViaCepResponseDto | null> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<ViaCepResponseDto>(
          `https://viacep.com.br/ws/${cep}/json/`,
        ),
      );

      if (response.data.erro) {
        return null;
      }

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error connecting to ViaCEP service',
      );
    }
  }
}
