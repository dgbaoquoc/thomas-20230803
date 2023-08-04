import { getCoinsSchema } from "@/lib/validations/coin";
import { Coin } from "@/types/coin";
import { z } from "zod";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function getCoins(input: z.infer<typeof getCoinsSchema>) {
  const { page, per_page, order = "market_cap_desc" } = input;

  const coinsResponse = await fetch(
    `${apiUrl}/coins/markets?vs_currency=usd&order=${order}&per_page=${per_page}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=2`
  );
  const coins = (await coinsResponse.json()) as Coin[];

  const totalResponse = await fetch(`${apiUrl}/coins/list`);
  const total = ((await totalResponse.json()) as object[])?.length ?? 0;

  return {
    total,
    coins,
  };
}
