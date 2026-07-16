import { Router } from "express";

import { addHealthCheckRoute } from "./routes/health-check";

export function addAppRoutes(app: Router) {
  addHealthCheckRoute(app);
}
