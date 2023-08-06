import { getCoinsSchema, getCoinMarketChartSchema } from "@/lib/validations/coin";
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

export async function getCoin(id: string) {
  if(id.length === 0) return null;

  const coinResponse = await fetch(`${apiUrl}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`);
  const coin = (await coinResponse.json());

  return {
    ...coin,
    image: coin.image.small ?? "missing_large.png",
  } as Coin;
}

export async function getCoinMarketChart(input: z.infer<typeof getCoinMarketChartSchema>) {
  const { id, days } = input; 
  if(id.length === 0) return null;
  const response = await fetch(`${apiUrl}/coins/${id}/market_chart?vs_currency=usd&days=${days}&precision=2
  `)

  const coinMarketData = await response.json();
  const coinMarketPrice = coinMarketData.prices

  return coinMarketPrice as Array<number[]>
}

export async function getCoinMartChartOhlc(input: z.infer<typeof getCoinMarketChartSchema>) {
  const { id, days } = input; 
  if(id.length === 0) return null;
  const response = await fetch(`${apiUrl}/coins/${id}/ohlc?vs_currency=usd&days=${days}&precision=2
  `)

  const coinMarketData = await response.json();

  return coinMarketData as Array<number[]>
}
