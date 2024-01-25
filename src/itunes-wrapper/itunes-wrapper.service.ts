import { Injectable } from '@nestjs/common';
import { HttpExtensionService } from '../http-extension/http-extension.service';

@Injectable()
export class ItunesWrapperService {
  private readonly itunesUrl = 'https://itunes.apple.com/';
  private readonly limitPerRequest = 10;

  constructor(private readonly httpExtensionService: HttpExtensionService) {}

  async fetch(name: string, title: string) {
    const response = await this.httpExtensionService.instance.get(
      `${this.itunesUrl}/search?term=${this.replaceSpaceSign(
        name,
      )}+${this.replaceSpaceSign(
        title,
      )}&entity=ebook&attribute=authorTerm&attribute=titleTerm&limit=${this.limitPerRequest}`,
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
