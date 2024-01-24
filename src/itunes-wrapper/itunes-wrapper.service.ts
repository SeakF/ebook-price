import { Injectable } from '@nestjs/common';
import { HttpExtensionService } from '../http-extension/http-extension.service';

@Injectable()
export class ItunesWrapperService {
  private readonly itunesUrl = 'https://itunes.apple.com/';

  constructor(private readonly httpExtensionService: HttpExtensionService) {}

  async fetch(name: string, title: string) {
    const response = await this.httpExtensionService.instance.get(
      `${this.itunesUrl}/search?term=${this.replaceSpaceSign(
        name,
      )}+${this.replaceSpaceSign(
        title,
      )}&entity=ebook&attribute=authorTerm&attribute=titleTerm`,
    );
    return response.data;
  }

  private replaceSpaceSign(sentence: string) {
    return sentence.split(' ').join('+');
  }
}
