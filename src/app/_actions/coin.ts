import {
  GetCoinInput,
  GetCoinMarketChartInput,
  getCoinMarketChartSchema,
} from "@/lib/validations/coin";
import { GlobalData, TrendingCoin, type Coin } from "@/types/coin";
import { z } from "zod";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function parseParams(input: object): string {
  const queryParams: string[] = [];
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      queryParams.push(
        `${key}=${encodeURIComponent(input[key as keyof object])}`
      );
    }
  }
  const queryString = queryParams.join("&");
  return queryString;
}

export async function getGlobal() {
  const response = await fetch(`${apiUrl}/global`);
  const result = await response.json();

  return result.data as GlobalData;
}

export async function getCoins(input: GetCoinInput) {
  const queryString = parseParams(input);
  const coinsResponse = fetch(`${apiUrl}/coins/markets?${queryString}`).then(
    (response) => response.json()
  );
  const totalResponse = fetch(`${apiUrl}/coins/list`).then((response) =>
    response.json()
  );

  try {
    const [coins, total] = await Promise.all([coinsResponse, totalResponse]);
    return {
      total: total,
      coins,
    };
  } catch (error) {
    throw new Error("Failed to fetch coins data");
  }
}

export async function getCoin(id: string) {
  if (id.length === 0) return null;

  // Remove unnecessary data
  const params = {
    localization: false,
    tickers: false,
    community_data: false,
    developer_data: false,
  };
  const queryString = parseParams(params);

  const coinResponse = await fetch(`${apiUrl}/coins/${id}?${queryString}`);

  if (!coinResponse.ok) throw new Error("Failed to fetch coin data");

  const coin = await coinResponse.json();

  return {
    ...coin,
    image: coin.image.small ?? "missing_large.png",
  } as Coin;
}

export async function getCoinMarketChart(input: GetCoinMarketChartInput) {
  const { id, days } = input;
  if (id.length === 0) return null;

  const queryString = parseParams(input);
  const response =
    await fetch(`${apiUrl}/coins/${id}/market_chart?vs_currency=usd&days=${days}&precision=2
  `);

  if (!response.ok) throw new Error("Failed to fetch coin's ohlc chart");

  const coinMarketData = await response.json();
  const coinMarketPrice = coinMarketData.prices;

  return coinMarketPrice as Array<number[]>;
}

export async function getCoinMartChartOhlc(input: GetCoinMarketChartInput) {
  const { id } = input;
  if (id.length === 0) return null;

  const queryString = parseParams(input);

  const response = await fetch(`${apiUrl}/coins/${id}/ohlc?${queryString}
  `);

  if (!response.ok) throw new Error("Failed to fetch coin's ohlc chart");

  const coinMarketData = await response.json();

  return coinMarketData as Array<number[]>;
}

export async function getTrendingCoins() {
  const response = await fetch(`${apiUrl}/search/trending`);

  if (!response.ok) throw new Error("Failed to fetch trending coins");

  const result = await response.json();

  const coins = result.coins.map((coin: { item: TrendingCoin }) => coin.item);

  return coins as TrendingCoin[];
}

export type QuerySearchResult = {
  category: "coins" | "categories";
  coins: TrendingCoin[];
  categories: { id: string; name: string }[];
}[];

export async function getSearchCoins(query: string) {
  const response = await fetch(`${apiUrl}/search?query=${query}`);

  if (!response.ok) throw new Error("Failed to fetch queried coins");

  const result = await response.json();

  // For now, only get result for coins & categories, the same with other data
  const coinsWithCategories = ["coins", "categories"].map((category) => ({
    category,
    coins: result.coins.length > 0 ? result.coins.slice(0, 5) : [],
    categories:
      result.categories.length > 0 ? result.categories.slice(0, 5) : [],
  }));

  return coinsWithCategories as QuerySearchResult;
}
