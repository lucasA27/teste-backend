import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CepResponseDto } from './dto/cep-response.dto';
import { CEP_PROVIDER } from './interfaces/cep-provider.interface';
import type { ICepProvider } from './interfaces/cep-provider.interface';

@Injectable()
export class CepService {
  constructor(
    @Inject(CEP_PROVIDER)
    private readonly cepProvider: ICepProvider,
  ) {}

  async findCep(cep: string): Promise<CepResponseDto> {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      throw new BadRequestException('CEP must contain 8 digits');
    }

    const address = await this.cepProvider.getAddressByCep(cleanCep);

    if (!address) {
      throw new NotFoundException(`CEP ${cep} not found`);
    }

    return address;
  }
}
