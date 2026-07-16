import crypto from "node:crypto";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "axios";
import config from "@/config";

const SIGNATURE_HEADER = "authorization";

export async function validateTikTokWebhook(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const signature = req.headers[SIGNATURE_HEADER];
  const rawBody = req.body;

  if (typeof signature !== "string" || !Buffer.isBuffer(rawBody)) {
    return res.sendStatus(HttpStatusCode.Unauthorized);
  }

  const expectedSignature = crypto
    .createHmac("sha256", config.tiktok.appSecret)
    .update(config.tiktok.appKey, "utf8")
    .update(rawBody)
    .digest("hex");

  const expected = Buffer.from(expectedSignature, "utf8");
  const received = Buffer.from(signature, "utf8");

  if (
    expected.length !== received.length ||
    !crypto.timingSafeEqual(expected, received)
  ) {
    return res.sendStatus(HttpStatusCode.Unauthorized);
  }

  req.body = JSON.parse(rawBody.toString("utf8"));

  next();
}
