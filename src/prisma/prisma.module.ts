import { Module, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, Logger],
  exports: [PrismaService],
})
export class PrismaModule {}
