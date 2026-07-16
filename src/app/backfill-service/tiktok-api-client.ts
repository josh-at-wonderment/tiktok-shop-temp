import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import config from "@/config";
import { getApiRequestSignature } from "@/app/auth-service";

const TIKTOK_API_BASE_URL = "https://open-api.tiktokglobalshop.com";

export function createTikTokApiClient(): AxiosInstance {
  const accessToken =
    "TTP_W9xTVgAAAADJOwi6DD4R9mqQtJuaBKD-QlkUQWLfE2hM-tLVinNvqwckIglR7dbgF4KuoQjBue0MBGmPkj_V5sh355cUoAm5Sb5HUWnaV-IeUoCUjnUBTh0q5e2a4R9CK8MLf7zp_co";

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
