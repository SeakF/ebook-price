import { Module } from '@nestjs/common';
import { NbpWrapperService } from './nbp-wrapper.service';
import { HttpExtensionModule } from '../http-extension/http-extension.module';

@Module({
  imports: [HttpExtensionModule],
  providers: [NbpWrapperService],
})
export class NbpWrapperModule {}
