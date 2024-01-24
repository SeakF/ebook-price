import { Test, TestingModule } from '@nestjs/testing';
import { ItunesWrapperService } from './itunes-wrapper.service';
import { HttpExtensionModule } from '../http-extension/http-extension.module';

describe('ItunesWrapperService', () => {
  let service: ItunesWrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpExtensionModule],
      providers: [ItunesWrapperService],
    }).compile();

    service = module.get<ItunesWrapperService>(ItunesWrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
