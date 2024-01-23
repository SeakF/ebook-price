import { Module, Logger } from '@nestjs/common';
import { HttpExtensionService } from './http-extension.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({})],
  providers: [HttpExtensionService, Logger],
})
export class HttpExtensionModule {}
