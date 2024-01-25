import { Test, TestingModule } from '@nestjs/testing';
import { DateHelpersService } from './date-helpers.service';
import { HelpersModule } from './helpers.module';

describe('DateHelpersService', () => {
  let service: DateHelpersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HelpersModule],
      providers: [DateHelpersService],
    }).compile();

    service = module.get<DateHelpersService>(DateHelpersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
