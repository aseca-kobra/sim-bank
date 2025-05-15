import { Module } from '@nestjs/common';
import { BankingService } from './banking.service';
import { BankingController } from './banking.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('BASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BankingController],
  providers: [BankingService],
})
export class BankingModule {}
