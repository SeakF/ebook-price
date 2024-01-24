import { Test, TestingModule } from '@nestjs/testing';
import { NbpWrapperService } from './nbp-wrapper.service';

describe('NbpWrapperService', () => {
  let service: NbpWrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NbpWrapperService],
    }).compile();

    service = module.get<NbpWrapperService>(NbpWrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
