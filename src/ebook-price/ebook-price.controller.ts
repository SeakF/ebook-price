import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { EbookPriceService } from './ebook-price.service';
import { EbookDataDto } from './ebook-price.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@Controller('ebook-price')
export class EbookPriceController {
  constructor(private readonly ebookPriceService: EbookPriceService) {}

  @Post()
  async ebookPrice(@Body() ebookData: EbookDataDto[]) {
    const dtoObject = plainToInstance(EbookDataDto, ebookData);

    try {
      await validateOrReject(dtoObject);
      return await this.ebookPriceService.calculate(ebookData);
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        error: e,
      };
    }
  }
}
