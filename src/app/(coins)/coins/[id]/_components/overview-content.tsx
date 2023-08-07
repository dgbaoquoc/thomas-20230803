"use client";

import LineChart from "@/components/chart/line-chart";
import OhlcChart from "@/components/chart/ohlc-chart";
import { Icons } from "@/components/icons";
import ChartLoading from "@/components/loadings/chart-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sortOptions } from "@/constants";
import { formatDate, formatPrice } from "@/lib/utils";
import { Coin } from "@/types/coin";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface OverviewContentProps {
  coin: Coin;
  coinMarketPrices: Array<number[]>;
  coinMarketPricesOhlc: Array<number[]>;
}

export default function OverviewContent({
  coin,
  coinMarketPrices,
  coinMarketPricesOhlc,
}: OverviewContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  // Search params
  const periodParam = searchParams?.get("period") ?? "1d";
  const chartTypeParam = searchParams?.get("chart") ?? "line";

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Period filter
  const [period, setPeriod] = React.useState(periodParam);

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          period,
        })}`
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  // Chart select
  const [chartType, setChartType] = React.useState(chartTypeParam);
  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          chart: chartType,
        })}`
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartType]);

  // Coin market price chart data
  const coinMarketPricesData = coinMarketPrices.map(([timestamp, price]) => ({
    x: dayjs(timestamp).format("D MMM"),
    y: price,
  }));

  const timestamps = coinMarketPricesData.map((entry) => entry.x);
  const prices = coinMarketPricesData.map((entry) => entry.y);

  // Coin ohlc chart data
  const coinMarketPricesOhlcData = coinMarketPricesOhlc.map(
    ([timestamp, open, high, low, close]) => ({
      x: new Date(timestamp),
      y: [open, high, low, close],
    })
  );

  const tableData = React.useMemo(() => {
    return [
      {
        cell: "Current Price",
        value: coin.name,
      },
      {
        cell: "24h Low / 24h High",
        value: `${formatPrice(coin.market_data.low_24h.usd)} / ${formatPrice(
          coin.market_data.high_24h.usd
        )}`,
      },
      {
        cell: "Market Cap Rank",
        value: `#${coin.market_cap_rank}`,
      },
      {
        cell: "Market Cap",
        value: formatPrice(coin.market_data.market_cap.usd),
      },
      {
        cell: "All-Time High",
        value: formatPrice(coin.market_data.ath.usd),
        subValue: formatDate(coin.market_data.ath_date.usd),
      },
      {
        cell: "All-Time Low",
        value: formatPrice(coin.market_data.atl.usd),
        subValue: formatDate(coin.market_data.ath_date.usd),
      },
    ];
  }, [coin]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="flex flex-col gap-y-2 lg:gap-y-4">
          <h2 className="text-2xl lg:text-xl">{coin.name} Price Chart</h2>

          <div>
            <Tabs defaultValue={chartType}>
              <TabsList className="flex justify-between">
                <div>
                  <TabsTrigger
                    value="line"
                    onClick={() => setChartType("line")}
                  >
                    <Icons.lineChart className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="ohlc"
                    onClick={() => setChartType("ohlc")}
                  >
                    <Icons.candleStickChart className="h-4 w-4" />
                  </TabsTrigger>
                </div>
                <div>
                  <Tabs defaultValue={period}>
                    <TabsList>
                      {sortOptions.map((option) => (
                        <TabsTrigger
                          key={option.value}
                          value={option.value}
                          disabled={isPending}
                          onClick={() => setPeriod(option.value)}
                        >
                          {option.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </TabsList>
              <TabsContent value="line">
                {isPending ? (
                  <ChartLoading />
                ) : (
                  <LineChart
                    type="line"
                    data={{
                      labels: timestamps,
                      datasets: [
                        {
                          label: "Price",
                          data: prices,
                          fill: false,
                          borderColor:
                            coin.market_data.price_change_percentage_24h < 0
                              ? "red"
                              : "green",
                          pointRadius: 0,
                        },
                      ],
                    }}
                    options={{
                      scales: {
                        x: {
                          time: {
                            unit: "day",
                            tooltipFormat: "D MMM",
                          },
                          ticks: {
                            source: "data",
                          },
                          grid: {
                            display: false,
                          },
                        },
                        y: {
                          grid: {
                            display: true,
                          },
                        },
                      },

                      plugins: {
                        tooltip: {
                          intersect: false,
                        },
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                )}
              </TabsContent>
              <TabsContent value="ohlc">
                {isPending ? (
                  <ChartLoading />
                ) : (
                  <OhlcChart
                    series={[
                      {
                        data: coinMarketPricesOhlcData,
                      },
                    ]}
                    options={{
                      chart: {
                        type: "candlestick",
                      },
                      xaxis: {
                        type: "datetime",
                      },
                      yaxis: {
                        tooltip: {
                          enabled: true,
                        },
                      },
                    }}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle>{coin.name} Price Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.cell}</TableCell>
                    <TableCell className="font-semibold">
                      {row.value} <br />
                      {row.subValue && (
                        <span className="text-sm font-normal">
                          ({row.subValue})
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
