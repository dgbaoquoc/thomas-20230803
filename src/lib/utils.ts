import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMacOs() {
  return window.navigator.userAgent.includes("Mac");
}

export function formatPrice(
  price: number | string,
  currency: "USD" | "EUR" | "GBP" | "BDT" = "USD",
  notation: "compact" | "engineering" | "scientific" | "standard" = "standard"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
  }).format(Number(price));
}

export function formatPercentage(price: number | string) {
  const roundedNumber = Math.abs(Number(price)).toFixed(2);
  return roundedNumber + "%";
}

export function formatDate(date: Date | string) {
  return dayjs(date).format("MMMM D, YYYY");
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

// Test no.2 here
/**
 * @param {number[]} prices
 * @return {number}
 */
export function maxProfit(prices: number[]): number {
  let minPrice = prices[0];
  let maxProfit = 0;
  prices.forEach(price => {
      minPrice = Math.min(minPrice, price);
      maxProfit = Math.max(maxProfit, price - minPrice);
  });
  return maxProfit;
}
