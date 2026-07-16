import snowflake from "@/connectors/snowflake";
import logger from "@/logger";

export async function isAppHealthy(): Promise<boolean> {
  try {
    await snowflake.sql("SELECT 1");

    return true;
  } catch (e) {
    logger.error("[isAppHealthy] Failed to connect to Snowflake", { e });
    return false;
  }
}
