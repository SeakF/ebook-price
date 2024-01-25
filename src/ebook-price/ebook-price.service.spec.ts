import { Test, TestingModule } from '@nestjs/testing';
import { EbookPriceService } from './ebook-price.service';
import { HelpersModule } from '../helpers/helpers.module';
import { ItunesWrapperModule } from '../itunes-wrapper/itunes-wrapper.module';
import { NbpWrapperModule } from '../nbp-wrapper/nbp-wrapper.module';
import { EbookPriceController } from './ebook-price.controller';

describe('EbookPriceService', () => {
  let service: EbookPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NbpWrapperModule, ItunesWrapperModule, HelpersModule],
      providers: [EbookPriceService],
      controllers: [EbookPriceController],
    }).compile();

    service = module.get<EbookPriceService>(EbookPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
