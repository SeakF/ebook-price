import { Test, TestingModule } from '@nestjs/testing';
import { NbpWrapperService } from './nbp-wrapper.service';
import { HttpExtensionModule } from '../http-extension/http-extension.module';
import { HelpersModule } from '../helpers/helpers.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

const cacheManagerMock = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('NbpWrapperService', () => {
  let service: NbpWrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpExtensionModule, HelpersModule, ConfigModule],
      providers: [
        NbpWrapperService,
        { provide: CACHE_MANAGER, useValue: cacheManagerMock },
      ],
      exports: [NbpWrapperService],
    }).compile();

    service = module.get<NbpWrapperService>(NbpWrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
