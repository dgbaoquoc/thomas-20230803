import { Coin } from "@/types/coin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { formatDate, formatPrice } from "@/lib/utils";

interface OverviewContentProps {
  coin: Coin;
}

export default function OverviewContent({ coin }: OverviewContentProps) {
  // store
  const tableData = React.useMemo(() => {
    return [
      {
        cell: "Current Price",
        value: coin.name,
      },
      {
        cell: "24h Low / 24h High",
        value: `${formatPrice(coin.market_data.low_24h.usd)} / ${formatPrice(coin.market_data.high_24h.usd)}`,
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
        subValue: formatDate(coin.market_data.ath_date.usd)
      },
      {
        cell: "All-Time Low",
        value: formatPrice(coin.market_data.atl.usd),
        subValue: formatDate(coin.market_data.ath_date.usd)
      },
    ];
  }, [coin]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="flex flex-col gap-y-2 lg:gap-y-4">
        <h2 className="text-2xl lg:text-xl">{coin.name} Price Chart</h2>

        </div>
      </div>

      {/* side bar */}
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
                    <TableCell className="font-semibold">{row.value} <br />
                    {row.subValue && <span className="text-sm font-normal">({row.subValue})</span>}
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
