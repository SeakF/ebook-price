import { Module } from '@nestjs/common';
import { ItunesWrapperService } from './itunes-wrapper.service';
import { HttpExtensionModule } from 'src/http-extension/http-extension.module';

@Module({
  imports: [HttpExtensionModule],
  providers: [ItunesWrapperService],
  exports: [ItunesWrapperService],
})
export class ItunesWrapperModule {}
