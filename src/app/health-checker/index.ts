import logger from "@/logger";

export async function isAppHealthy(): Promise<boolean> {
  try {
    return true;
  } catch (e) {
    logger.error("[isAppHealthy] bad", { e });
    return false;
  }
}
