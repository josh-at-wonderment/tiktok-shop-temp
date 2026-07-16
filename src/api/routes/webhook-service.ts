import { raw as rawBodyParser, Router, Response } from "express";

import { HttpStatusCode } from "axios";
import { VerifiedRequest } from "../types";
import { validateTikTokWebhook } from "../middlewares/validate-webhook";

export function addWebhookServiceRoutes(app: Router) {
  const basePath = "/webhook-service";

  const router = Router();
  app.use(basePath, router);

  router.post("/", async (req: VerifiedRequest, res: Response) => {
    const body = req.body;
    const headers = req.headers;

    // console.log("JTP-10", { body, headers });

    res.sendStatus(HttpStatusCode.Ok);
  });
}
