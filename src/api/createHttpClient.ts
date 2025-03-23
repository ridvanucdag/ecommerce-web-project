import axios from 'axios';
import axiosRetry from 'axios-retry';
import { QueryOptions } from './createHttpClient.types';
import setupHttpInterceptors from './setupHttpInterceptors';
import LoggerService from '../providers/loggerService/loggerService';

const createHttpClient = (baseURL: string) => {
  const httpClient = axios.create({
    baseURL,
  });

  axiosRetry(httpClient, {
    retries: QueryOptions.RETRY,
    retryDelay: retryCount => retryCount * QueryOptions.RETRY_DELAY,
    shouldResetTimeout: true,
    retryCondition: error => {
      LoggerService.logRetryError(error);
      return true;
    },
  });

  httpClient.defaults.timeout = 30 * 1000;
  httpClient.defaults.headers.common['Content-Type'] = 'application/json';
  httpClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  httpClient.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';

  setupHttpInterceptors(httpClient);
  return httpClient;
};

export const httpClient = createHttpClient('https://dummyjson.com/');