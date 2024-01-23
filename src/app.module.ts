import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpExtensionModule } from './http-extension/http-extension.module';

@Module({
  imports: [HttpExtensionModule],
  controllers: [AppController],
})
export class AppModule {}
