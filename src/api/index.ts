import { Router } from "express";

import { addHealthCheckRoute } from "./routes/health-check";
import { addAuthRoutes } from "./routes/auth";
import { addWebhookServiceRoutes } from "./routes/webhook-service";

export function addAppRoutes(app: Router) {
  addAuthRoutes(app);
  addHealthCheckRoute(app);
  addWebhookServiceRoutes(app);
}
