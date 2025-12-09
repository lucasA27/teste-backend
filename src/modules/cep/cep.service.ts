import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CepResponseDto } from './dto/cep-response.dto';
import { ViaCepService } from '../../integrations/viacep/viacep.service';

@Injectable()
export class CepService {
  constructor(private readonly viaCepService: ViaCepService) {}

  async findCep(cep: string): Promise<CepResponseDto> {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      throw new BadRequestException('CEP must contain 8 digits');
    }

    const address = await this.viaCepService.getAddressByCep(cleanCep);

    if (!address) {
      throw new NotFoundException(`CEP ${cep} not found`);
    }

    return {
      cep: address.cep,
      logradouro: address.logradouro,
      complemento: address.complemento,
      bairro: address.bairro,
      localidade: address.localidade,
      uf: address.uf,
      ibge: address.ibge,
      gia: address.gia,
      ddd: address.ddd,
      siafi: address.siafi,
    };
  }
}
