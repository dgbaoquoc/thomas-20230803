import * as z from "zod";

export const getCoinsSchema = z.object({
  page: z.number(),
  per_page: z.number().default(100),
  order: z.string().default("market_cap_desc"),
  vs_currency: z.string().default("usd"),
  locale: z.string().default("en"),
  sparkline: z.boolean().default(true),
  price_change_percentage: z.string().default("1h,24h,7d"),
  precision: z.string().default("2"),
});

export type GetCoinInput = z.infer<typeof getCoinsSchema>;

export const getCoinMarketChartSchema = z.object({
  id: z.string(),
  days: z.number().max(30),
  vs_currency: z.string().default("usd"),
  precision: z.string().default("2"),
});

export type GetCoinMarketChartInput = z.infer<typeof getCoinMarketChartSchema>;
