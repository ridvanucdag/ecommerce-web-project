import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  ApiEndpoints,
  HttpMethod,
  HttpStatus,
  QueryOptions,
} from "./createHttpClient.types";
import { AuthResponse } from "../requests/auth/auth.types";
import {
  getParsedItem,
  removeItem,
  setItem,
} from "../providers/localStorage/localStorageService";
import LoggerService from "../providers/loggerService/loggerService";
import { StorageKeys } from "../providers/localStorage/localStorage.types";

const addAuthHeader = async (
  config: InternalAxiosRequestConfig<unknown>
): Promise<InternalAxiosRequestConfig<unknown>> => {
  const user = getParsedItem<AuthResponse>(StorageKeys.User);
  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  LoggerService.logApiRequest(config);
  return config;
};

const handleRequestError = (error: AxiosError): Promise<never> => {
  return Promise.reject(error);
};

const handleResponseSuccess = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const refreshToken = (
  httpClient: AxiosInstance,
  originalRequest: InternalAxiosRequestConfig<unknown>,
  user: AuthResponse
): Promise<AxiosResponse> => {
  return httpClient({
    url: ApiEndpoints.REFRESH_TOKEN,
    method: HttpMethod.POST,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.refreshToken}`,
    },
    data: {
      refreshToken: user?.refreshToken,
      expiresInMins: QueryOptions.expiresInMins,
    },
  })
    .then((response: AxiosResponse) => {
      setItem(
        StorageKeys.User,
        JSON.stringify({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      return httpClient(originalRequest);
    })
    .catch((error) => {
      LoggerService.logApiError(error);
      return Promise.reject(error);
    });
};

const handleResponseError = async (
  httpClient: AxiosInstance,
  error: AxiosError
): Promise<AxiosError | AxiosResponse> => {
  LoggerService.logApiError(error);
  const user = getParsedItem<AuthResponse>(StorageKeys.User);

  if (!user) {
    return Promise.reject(error);
  }
  if (error.response?.status === HttpStatus.UNAUTHORIZED) {
    const isRefreshTokenRequest = error.config?.data?.includes("refreshToken");
    if (!isRefreshTokenRequest) {
      if (user?.isLogin) {
        return refreshToken(
          httpClient,
          error.config as InternalAxiosRequestConfig<unknown>,
          user
        );
      }
    } else {
      removeItem(StorageKeys.Profile);
      removeItem(StorageKeys.User);
    }
  }

  return Promise.reject(error);
};

const setupHttpInterceptors = (httpClient: AxiosInstance): void => {
  httpClient.interceptors.request.use(
    (config) => addAuthHeader(config),
    (error) => handleRequestError(error)
  );

  httpClient.interceptors.response.use(
    (response) => handleResponseSuccess(response),
    (error) => handleResponseError(httpClient, error)
  );
};

export default setupHttpInterceptors;
