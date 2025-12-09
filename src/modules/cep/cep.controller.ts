import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CepService } from './cep.service';
import { CepResponseDto } from './dto/cep-response.dto';

@ApiTags('cep')
@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get(':cep')
  @ApiOperation({ summary: 'Consultar endereço por CEP' })
  @ApiResponse({
    status: 200,
    description: 'Dados do endereço encontrados com sucesso.',
    type: CepResponseDto,
  })
  @ApiResponse({ status: 400, description: 'CEP inválido.' })
  @ApiResponse({ status: 404, description: 'CEP não encontrado.' })
  async findCep(@Param('cep') cep: string): Promise<CepResponseDto> {
    return this.cepService.findCep(cep);
  }
}
