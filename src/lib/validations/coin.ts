import * as z from "zod";

export const getCoinsSchema = z.object({
  page: z.number(),
  per_page: z.number().default(100),
  order: z.string().optional(),
});

export const getCoinMarketChartSchema = z.object({
  id: z.string(),
  days: z.number().max(30),
});
