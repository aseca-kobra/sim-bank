import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BankOperationDto } from './dto/deposit.dto';
import { ExternalApiResponse } from './interfaces/external-api-response.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BankingService {

  private accounts: Map<string, number> = new Map([
    ['luz@example.com', 1000],
    ['santos@example.com', 1000],
    ['pedro@example.com', 1000],
    ['tomas@example.com', 1000],
    ['user1@example.com', 10000],
    ['user2@example.com', 10000],
  ]);

  constructor(private readonly httpService: HttpService) {}

  async deposit(depositDto: BankOperationDto): Promise<ExternalApiResponse> {
    const { email, amount } = depositDto;
    if (!this.accounts.has(email)) {
      return { success: false, message: 'Account not found' };
    }

    const current = this.accounts.get(email)!;
    if (current < amount) {
      return { success: false, message: 'Insufficient funds' };
    }

    this.accounts.set(email, current - amount);

    try {
      await firstValueFrom(
        this.httpService.post('/wallet/deposit', {
          amount,
          email,
        }),
      );

      return { success: true, message: `Deposited ${amount} to ${email}` };
    } catch (error) {
      this.accounts.set(email, current);
      return { success: false, message: 'Wallet deposit failed, rollback executed' };
    }
  }


  async debin(debitDto: BankOperationDto): Promise<ExternalApiResponse> {
    const { email, amount } = debitDto;
    if (!this.accounts.has(email)) {
      return { success: false, message: 'Account not found' };
    }
    const current = this.accounts.get(email)!;
    if (current < amount) {
      return { success: false, message: 'Insufficient funds' };
    }
    this.accounts.set(email, current - amount);
    return { success: true, message: `Debited ${amount} from ${email}` };
  }

  getStatus(): Record<string, number> {
    return Object.fromEntries(this.accounts);
  }
}
