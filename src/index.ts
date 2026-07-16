import "module-alias/register"; // Used for '@' imports
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";

import config from "./config";
import logger from "./logger";
import { addAppRoutes } from "./api";
import { WEBHOOK_SERVICE_BASE_PATH } from "./api/routes/webhook-service";

async function startServer() {
  const app = express();
  const server = http.createServer(app);

  app.enable("trust proxy");

  app.use(cookieParser());

  // Webhook signature verification needs the untouched raw bytes of the
  // request body, so this must run before express.json() consumes the
  // stream for every other route.
  app.use(WEBHOOK_SERVICE_BASE_PATH, express.raw({ type: "application/json" }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // cors
  const corsList = config.corsList;
  app.use(
    cors({
      origin: corsList,
      credentials: true,
    }),
  );

  // add routes
  addAppRoutes(app);

  server
    .listen(config.server.port, () => {
      logger.info(
        `✅ Server started. Port: ${config.server.port}. Env: ${
          config.appEnv.env
        } ${config.appEnv.isDev ? "😎" : "⛔️"}`,
      );
    })
    .on("error", (err) => {
      logger.error(err);
      process.exit(1);
    });
}

startServer();
