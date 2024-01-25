import { Module } from '@nestjs/common';
import { NbpWrapperService } from './nbp-wrapper.service';
import { HttpExtensionModule } from '../http-extension/http-extension.module';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [HttpExtensionModule, HelpersModule],
  providers: [NbpWrapperService],
  exports: [NbpWrapperService],
})
export class NbpWrapperModule {}
