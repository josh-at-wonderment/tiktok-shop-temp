import { createTikTokApiClient } from "@/app/backfill-service/tiktok-api-client";

async function getOrderList(accessToken: string) {
  const client = createTikTokApiClient(accessToken);

  const response = await client.post("/order/202309/orders/search", {
    page_size: 50,
    order_status: "AWAITING_SHIPMENT",
  });

  return response.data;
}

async function main() {
  console.log("hello, world");
}

main();
