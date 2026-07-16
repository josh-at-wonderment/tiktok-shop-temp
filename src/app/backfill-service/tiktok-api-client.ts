import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import config from "@/config";
import { getApiRequestSignature } from "@/app/auth-service";

const TIKTOK_API_BASE_URL = "https://open-api.tiktokglobalshop.com";

export function createTikTokApiClient(accessToken: string): AxiosInstance {
  const client = axios.create({
    baseURL: TIKTOK_API_BASE_URL,
    headers: {
      "content-type": "application/json",
      "x-tts-access-token": accessToken,
    },
  });

  client.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => {
      requestConfig.params = {
        ...requestConfig.params,
        app_key: config.tiktok.appKey,
        timestamp: Math.floor(Date.now() / 1000),
      };

      requestConfig.params.sign = getApiRequestSignature({
        ...requestConfig,
        url: `${requestConfig.baseURL}${requestConfig.url}`,
      });

      return requestConfig;
    },
  );

  return client;
}
