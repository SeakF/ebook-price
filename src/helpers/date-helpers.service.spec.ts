import { Test, TestingModule } from '@nestjs/testing';
import { DateHelpersService } from './date-helpers.service';

describe('DateHelpersService', () => {
  let service: DateHelpersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateHelpersService],
    }).compile();

    service = module.get<DateHelpersService>(DateHelpersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
