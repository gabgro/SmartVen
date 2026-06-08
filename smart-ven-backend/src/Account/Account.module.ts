import { Module } from '@nestjs/common';
import { AccountService } from './Account.service';
import { AccountController } from './Account.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, PrismaService],
  exports: [AccountService],
})
export class AccountModule {}
