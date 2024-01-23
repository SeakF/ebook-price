import { Test, TestingModule } from '@nestjs/testing';
import { HttpExtensionService } from './http-extension.service';

describe('HttpExtensionService', () => {
  let service: HttpExtensionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpExtensionService],
    }).compile();

    service = module.get<HttpExtensionService>(HttpExtensionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
