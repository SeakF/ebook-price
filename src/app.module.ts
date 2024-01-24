import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpExtensionModule } from './http-extension/http-extension.module';
import { NbpWrapperModule } from './nbp-wrapper/nbp-wrapper.module';
import { ItunesWrapperModule } from './itunes-wrapper/itunes-wrapper.module';

@Module({
  imports: [HttpExtensionModule, NbpWrapperModule, ItunesWrapperModule],
  controllers: [AppController],
})
export class AppModule {}
