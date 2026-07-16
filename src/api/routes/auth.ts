import { Router, Response } from "express";

import { HttpStatusCode } from "axios";
import { VerifiedRequest } from "../types";

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

      console.log("JTP-2", { appKey, accessCode, locale, shopRegion });

      /**
       * app_key=6kjvlkpek7hup
       * code=TTP_q0XgewAAAAC_sDKqZzZP5xXGVz6L5MXNXaOv6SzYVLZ7X4lez8xH4yncyB3IgF6tHTfVVHk8gdFZPe19JFaLEpJ34dmjqmsr
       * locale=en
       * shop_region=US
       */

      return res.sendStatus(HttpStatusCode.Ok);
    },
  );
}
