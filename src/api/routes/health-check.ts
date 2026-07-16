import { isAppHealthy } from "@/app/health-checker";
import { Router, Response } from "express";

import { HttpStatusCode } from "axios";
import { VerifiedRequest } from "../types";

export function addHealthCheckRoute(app: Router) {
  const basePath = "/health";

  const router = Router();
  app.use(basePath, router);

  router.get("/", async (req: VerifiedRequest, res: Response) => {
    const isHealthy = await isAppHealthy();

    const resStatus = isHealthy
      ? HttpStatusCode.Ok
      : HttpStatusCode.ServiceUnavailable;

    res.sendStatus(resStatus);
  });
}
