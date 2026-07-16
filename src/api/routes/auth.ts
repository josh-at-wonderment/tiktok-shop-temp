import { Router, Response } from "express";
import axios from "axios";

import { HttpStatusCode } from "axios";
import { VerifiedRequest } from "../types";
import config from "@/config";

export function addAuthRoutes(app: Router) {
  const basePath = "/auth";

  const router = Router();
  app.use(basePath, router);

  router.get(
    "/install/redirect",
    async (req: VerifiedRequest, res: Response) => {
      console.log("JTP-1", req.query);

      const qParams = req.query;

      const appKey = qParams.app_key;
      const accessCode = qParams.code;
      const locale = qParams.locale;
      const shopRegion = qParams.shop_region;

      // TODO - error handling

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

      // TODO - error handling

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

      return res.sendStatus(HttpStatusCode.Ok);
    },
  );
}
