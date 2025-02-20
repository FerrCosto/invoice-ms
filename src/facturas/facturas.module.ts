import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { NatsModule } from 'src/transports/nats.module';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  imports: [NatsModule, PrinterModule],
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class FacturasModule {}
