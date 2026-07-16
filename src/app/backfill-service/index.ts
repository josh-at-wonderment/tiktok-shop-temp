import { createTikTokApiClient } from "@/app/backfill-service/tiktok-api-client";

async function getActiveShops() {
  const client = createTikTokApiClient();

  const response = await client.get("/authorization/202309/shops", {});

  const data = response.data.data.shops;

  console.log("JTP-1", { data });

  return response.data;
}

getActiveShops();
