import { Router } from "express";

import { addHealthCheckRoute } from "./routes/health-check";
import { addAuthRoutes } from "./routes/auth";

export function addAppRoutes(app: Router) {
  addAuthRoutes(app);
  addHealthCheckRoute(app);
}
