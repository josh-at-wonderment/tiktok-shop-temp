import config from "@/config";
import axios, { AxiosRequestConfig } from "axios";
import crypto from "node:crypto";

export async function retrieveAndPersistAccessToken(
  accessCode: string,
): Promise<boolean> {
  const tokenRes = await axios.get(
    "https://auth.tiktok-shops.com/api/v2/token/get",
    {
      params: {
        app_key: config.tiktok.appKey,
        app_secret: config.tiktok.appSecret,
        auth_code: accessCode,
        grant_type: "authorized_code",
      },
    },
  );

  const tokenData = tokenRes?.data?.data;

  const {
    access_token: accessToken,
    access_token_expire_in: accessTokenExpiresIn,
    refresh_token: refreshToken,
    refresh_token_expire_in: refreshtTokenExpiresIn,
    open_id: openID,
    seller_name: sellerName,
    seller_base_region: sellerBaseRegion,
    user_type: userType,
    granted_scopes: grantScopes,
  } = tokenData;

  console.log({ accessToken });

  // TODO - persist

  return false;
}

export async function refreshAndPersistAccessToken(refreshToken: string) {}

// Reference: https://partner.tiktokshop.com/docv2/page/sign-your-api-request
export function getApiRequestSignature(requestConfig: AxiosRequestConfig) {
  const appSecret = config.tiktok.appSecret;

  // _____ Step 1: Extract all query parameters excluding sign and access_token, sorted alphabetically _____ \\
  const params = requestConfig.params || {};
  const sortedParams = Object.keys(params)
    .filter((key) => !["sign", "access_token"].includes(key))
    .sort()
    .map((key) => ({ key, value: params[key] }));

  // _____ Step 2: Concatenate all the parameters in the format {key}{value} _____ \\
  const paramString = sortedParams
    .map(({ key, value }) => `${key}${value}`)
    .join("");

  // _____ Step 3: Append the string from Step 2 to the API request path _____ \\
  const pathname = new URL(requestConfig.url!).pathname;

  let signString = `${pathname}${paramString}`;

  // _____ Step 4: If the request header content-type is not multipart/form-data, append the API request body to the string from Step 3 _____ \\
  const contentType = requestConfig.headers?.["content-type"];

  if (
    contentType !== "multipart/form-data" &&
    requestConfig.data &&
    Object.keys(requestConfig.data).length
  ) {
    signString += JSON.stringify(requestConfig.data);
  }

  // _____ Step 5: Wrap the string generated in Step 4 with the app_secret _____ \\
  signString = `${appSecret}${signString}${appSecret}`;

  // _____ Step6: Encode your wrapped string using HMAC-SHA256 _____ \\
  return crypto
    .createHmac("sha256", appSecret)
    .update(signString)
    .digest("hex");
}
