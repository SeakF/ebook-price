import { Injectable } from '@nestjs/common';
import { HttpExtensionService } from '../http-extension/http-extension.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ItunesWrapperService {
  private readonly itunesUrl: string;
  private readonly limitPerRequest = 10;

  constructor(
    private readonly httpExtensionService: HttpExtensionService,
    private readonly configService: ConfigService,
  ) {
    this.itunesUrl = this.configService.get('ITUNES_URL');
  }

  async fetch(name: string, title: string) {
    const response = await this.httpExtensionService.instance.get(
      `${this.itunesUrl}/search?term=${this.replaceSpaceSign(
        name,
      )}+${this.replaceSpaceSign(
        title,
      )}&entity=ebook&attribute=authorTerm&attribute=titleTerm&limit=${
        this.limitPerRequest
      }`,
    );
    return response.data;
  }

  private replaceSpaceSign(sentence: string) {
    return this.removeKeywordThe(sentence.split(' ')).join('+');
  }

  private removeKeywordThe(wordArray: string[]) {
    const asd = wordArray.filter((word) => word.toLowerCase() !== 'the');
    return asd;
  }
}
