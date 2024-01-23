import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axiosRetry from 'axios-retry';
import { AxiosInstance } from 'axios';

@Injectable()
export class HttpExtensionService {
  private httpInstance: AxiosInstance;

  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger,
  ) {
    axiosRetry(this.httpService.axiosRef, {
      retries: 3,
      onRetry: (retryCount, error) => {
        this.logger.error(
          `retry: ${retryCount}\non: ${
            error?.config?.url
          }\nwith: ${JSON.stringify(error?.response?.data)}`,
        );
      },
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) => {
        return error.response?.status !== 404;
      },
    });

    this.httpInstance = this.httpService.axiosRef;
  }

  get instance() {
    return this.httpInstance;
  }
}
