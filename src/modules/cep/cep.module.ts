import { Module } from '@nestjs/common';
import { CepService } from './cep.service';
import { CepController } from './cep.controller';
import { ViaCepModule } from '../../integrations/viacep/viacep.module';
import { CEP_PROVIDER } from './interfaces/cep-provider.interface';
import { ViaCepAdapter } from './adapters/viacep.adapter';

@Module({
  imports: [ViaCepModule],
  controllers: [CepController],
  providers: [
    CepService,
    {
      provide: CEP_PROVIDER,
      useClass: ViaCepAdapter,
    },
  ],
})
export class CepModule {}
