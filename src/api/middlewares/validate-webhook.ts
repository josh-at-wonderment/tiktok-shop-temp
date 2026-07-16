import crypto from "node:crypto";
import { Request, Response, NextFunction } from "express";
import config from "@/config";

export async function validateTikTokWebhook(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const headers = req.headers;

  const rawBody = req.body as Buffer;

  console.log("JTP-0", { rawBody });

  const expectedSignature = crypto
    .createHmac("sha256", config.tiktok.appSecret)
    .update(config.tiktok.appKey, "utf8")
    .update(rawBody)
    .digest("hex");

  console.log("JTP-1", { headers, expectedSignature });

  next();
}
