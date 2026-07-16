import axios from "axios";

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

  // TODO - persist

  return false;
}
