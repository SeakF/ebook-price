import { Module } from '@nestjs/common';
import { ItunesWrapperService } from './itunes-wrapper.service';
import { HttpExtensionModule } from '../http-extension/http-extension.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpExtensionModule, ConfigModule],
  providers: [ItunesWrapperService],
  exports: [ItunesWrapperService],
})
export class ItunesWrapperModule {}
