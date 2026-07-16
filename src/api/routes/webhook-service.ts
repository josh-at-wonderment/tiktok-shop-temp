import { Router, Response } from "express";

import { HttpStatusCode } from "axios";
import { VerifiedRequest } from "../types";
import { validateTikTokWebhook } from "../middlewares/validate-webhook";

export const WEBHOOK_SERVICE_BASE_PATH = "/webhook-service";

export function addWebhookServiceRoutes(app: Router) {
  const router = Router();
  app.use(WEBHOOK_SERVICE_BASE_PATH, router);
  router.use(validateTikTokWebhook);

  router.post("/", async (req: VerifiedRequest, res: Response) => {
    res.sendStatus(HttpStatusCode.Ok);
  });
}
