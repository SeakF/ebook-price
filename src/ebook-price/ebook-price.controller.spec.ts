import { Test, TestingModule } from '@nestjs/testing';
import { EbookPriceController } from './ebook-price.controller';
import { EbookPriceModule } from './ebook-price.module';
import { EbookPriceService } from './ebook-price.service';
import { HelpersModule } from '../helpers/helpers.module';
import { ItunesWrapperModule } from '../itunes-wrapper/itunes-wrapper.module';
import { NbpWrapperModule } from '../nbp-wrapper/nbp-wrapper.module';

describe('EbookPriceController', () => {
  let controller: EbookPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EbookPriceModule,
        NbpWrapperModule,
        ItunesWrapperModule,
        HelpersModule,
      ],
      providers: [EbookPriceService],
      controllers: [EbookPriceController],
    }).compile();

    controller = module.get<EbookPriceController>(EbookPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
