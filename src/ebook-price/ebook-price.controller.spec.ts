import { Test, TestingModule } from '@nestjs/testing';
import { EbookPriceController } from './ebook-price.controller';

describe('EbookPriceController', () => {
  let controller: EbookPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EbookPriceController],
    }).compile();

    controller = module.get<EbookPriceController>(EbookPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
