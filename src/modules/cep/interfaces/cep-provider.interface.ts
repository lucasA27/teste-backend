import { CepResponseDto } from '../dto/cep-response.dto';

export const CEP_PROVIDER = 'CEP_PROVIDER';

export interface ICepProvider {
  getAddressByCep(cep: string): Promise<CepResponseDto | null>;
}
