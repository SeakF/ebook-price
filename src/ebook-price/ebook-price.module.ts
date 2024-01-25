import { Module } from '@nestjs/common';
import { EbookPriceService } from './ebook-price.service';
import { EbookPriceController } from './ebook-price.controller';
import { NbpWrapperModule } from '../nbp-wrapper/nbp-wrapper.module';
import { ItunesWrapperModule } from '../itunes-wrapper/itunes-wrapper.module';
import { HelpersModule } from '../helpers/helpers.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [NbpWrapperModule, ItunesWrapperModule, HelpersModule, PrismaModule],
  providers: [EbookPriceService],
  controllers: [EbookPriceController],
})
export class EbookPriceModule {}
