import { Module } from '@nestjs/common';
import { DateHelpersService } from './date-helpers.service';

@Module({
  providers: [DateHelpersService],
  exports: [DateHelpersService],
})
export class HelpersModule {}
