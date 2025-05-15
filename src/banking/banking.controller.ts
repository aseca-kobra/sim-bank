import { Controller, Post, Body } from '@nestjs/common';
import { BankingService } from './banking.service';
import { DepositDto } from './dto/deposit.dto';
import { ExternalApiResponse } from './interfaces/external-api-response.interface';
import { DebinDto } from './dto/debin.dto';

@Controller()
export class BankingController {
  constructor(private readonly bankingService: BankingService) {}

  @Post('deposit')
  async deposit(@Body() depositDto: DepositDto): Promise<void> {
    await this.bankingService.deposit(depositDto);
  }

  @Post('debin')
  async debin(@Body() debinDto: DebinDto): Promise<ExternalApiResponse> {
    return this.bankingService.debin(debinDto);
  }
}
