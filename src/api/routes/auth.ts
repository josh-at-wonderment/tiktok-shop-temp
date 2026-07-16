import { Router, Response } from "express";

import { HttpStatusCode } from "axios";
import { VerifiedRequest } from "../types";
``;
import { retrieveAndPersistAccessToken } from "@/app/auth-service";

export function addAuthRoutes(app: Router) {
  const basePath = "/auth";

  const router = Router();
  app.use(basePath, router);

  router.get(
    "/install/redirect",
    async (req: VerifiedRequest, res: Response) => {
      const accessCode = req.query.code as string;

      if (!accessCode) {
        return res.sendStatus(HttpStatusCode.BadRequest);
      }

      await retrieveAndPersistAccessToken(accessCode);

      // TODO - redirect somewhere
      return res.sendStatus(HttpStatusCode.Ok);
    },
  );
}
