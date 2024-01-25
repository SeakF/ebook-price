import { Test, TestingModule } from '@nestjs/testing';
import { ItunesWrapperService } from './itunes-wrapper.service';
import { HttpExtensionModule } from '../http-extension/http-extension.module';
import { ConfigModule } from '@nestjs/config';

describe('ItunesWrapperService', () => {
  let service: ItunesWrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpExtensionModule, ConfigModule],
      providers: [ItunesWrapperService],
      exports: [ItunesWrapperService],
    }).compile();

    service = module.get<ItunesWrapperService>(ItunesWrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
