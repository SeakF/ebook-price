import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private _db!: PrismaClient;
  constructor(private logger: Logger) {}

  async onModuleInit() {
    try {
      this._db = new PrismaClient();
      this.logger.log('Connecting to database', 'PrismaService');
      await this._db.$connect();
    } catch (e) {
      this.logger.error(`Connection to database error\n${e}`, 'PrismaService');
    }
  }

  async onModuleDestroy() {
    await this._db.$disconnect();
  }

  get db() {
    return this._db;
  }
}
