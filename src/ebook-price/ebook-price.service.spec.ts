import { Test, TestingModule } from '@nestjs/testing';
import { EbookPriceService } from './ebook-price.service';

describe('EbookPriceService', () => {
  let service: EbookPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EbookPriceService],
    }).compile();

    service = module.get<EbookPriceService>(EbookPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
