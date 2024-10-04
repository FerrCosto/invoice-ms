import { Module } from '@nestjs/common';
import { FacturasModule } from './facturas/facturas.module';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [FacturasModule, PrinterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
