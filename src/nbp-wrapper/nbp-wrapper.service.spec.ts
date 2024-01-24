import { Test, TestingModule } from '@nestjs/testing';
import { NbpWrapperService } from './nbp-wrapper.service';
import { HttpExtensionModule } from '../http-extension/http-extension.module';

describe('NbpWrapperService', () => {
  let service: NbpWrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpExtensionModule],
      providers: [NbpWrapperService],
    }).compile();

    service = module.get<NbpWrapperService>(NbpWrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
