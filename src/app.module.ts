import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpExtensionModule } from './http-extension/http-extension.module';
import { NbpWrapperModule } from './nbp-wrapper/nbp-wrapper.module';
import { ItunesWrapperModule } from './itunes-wrapper/itunes-wrapper.module';
import { EbookPriceModule } from './ebook-price/ebook-price.module';
import { HelpersModule } from './helpers/helpers.module';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    HttpExtensionModule,
    NbpWrapperModule,
    ItunesWrapperModule,
    EbookPriceModule,
    HelpersModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'cache',
      port: 6379,
      max: 1000,
      ttl: 1000 * 60 * 60 * 24,
    }),
    PrismaModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
