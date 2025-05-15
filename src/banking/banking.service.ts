import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DepositDto } from './dto/deposit.dto';
import { DebinDto } from './dto/debin.dto';
import { ExternalApiResponse } from './interfaces/external-api-response.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BankingService {
  constructor(private readonly httpService: HttpService) {}

  async deposit(depositDto: DepositDto): Promise<void> {
    await firstValueFrom(
      this.httpService.post('/wallet/deposit', {
        amount: depositDto.amount,
        walletId: depositDto.walletId,
      }),
    );
  }

  async debin(debitDto: DebinDto): Promise<ExternalApiResponse> {
    // As per requirements, we always accept the debit
    return {
      success: true,
      message: 'Debit operation accepted',
    };
  }
}
