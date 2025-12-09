import { Injectable } from '@nestjs/common';
import { ICepProvider } from '../interfaces/cep-provider.interface';
import { CepResponseDto } from '../dto/cep-response.dto';
import { ViaCepService } from '../../../integrations/viacep/viacep.service';

@Injectable()
export class ViaCepAdapter implements ICepProvider {
  constructor(private readonly viaCepService: ViaCepService) {}

  async getAddressByCep(cep: string): Promise<CepResponseDto | null> {
    const viaCepResponse = await this.viaCepService.getAddressByCep(cep);

    if (!viaCepResponse) {
      return null;
    }

    return {
      cep: viaCepResponse.cep,
      logradouro: viaCepResponse.logradouro,
      complemento: viaCepResponse.complemento,
      bairro: viaCepResponse.bairro,
      localidade: viaCepResponse.localidade,
      uf: viaCepResponse.uf,
      ibge: viaCepResponse.ibge,
      gia: viaCepResponse.gia,
      ddd: viaCepResponse.ddd,
      siafi: viaCepResponse.siafi,
    };
  }
}
