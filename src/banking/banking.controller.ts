import { Controller, Post, Body, Get } from '@nestjs/common';
import { BankingService } from './banking.service';
import { BankOperationDto } from './dto/deposit.dto';
import { ExternalApiResponse } from './interfaces/external-api-response.interface';

@Controller()
export class BankingController {
  constructor(private readonly bankingService: BankingService) {}

  @Post('deposit')
  async deposit(@Body() bankOperationDto: BankOperationDto): Promise<ExternalApiResponse> {
    return this.bankingService.deposit(bankOperationDto);
  }

  @Post('debin')
  async debin(@Body() bankOperationDto: BankOperationDto): Promise<ExternalApiResponse> {
    return this.bankingService.debin(bankOperationDto);
  }

  @Get('status')
  getStatus(): Record<string, number> {
    return this.bankingService.getStatus();
  }
}
