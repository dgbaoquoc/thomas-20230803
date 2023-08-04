"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { Coin } from "@/types/coin";
import { cn, formatPercentage, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Sparklines, SparklinesLine } from "react-sparklines";

interface CoinsTableShellProps {
  data: Coin[];
  pageCount: number;
}

export default function CoinsTableShell({
  data,
  pageCount,
}: CoinsTableShellProps) {
  const [isPending, startTransition] = React.useTransition();
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([]);

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Coin, unknown>[]>(
    () => [
      {
        id: "index",
        header: "#",
        cell: ({ row }) => Number(row.id) + 1,
        enableHiding: false
      },
      {
        accessorKey: "id",
        header: "Coin",
        cell: ({ row }) => {
          const { image, name, symbol } = row.original;

          return (
            <div className="flex items-center gap-x-2">
              <div className="relative h-6 w-6">
                <Image
                  fill
                  src={image}
                  alt={name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <Link
                href={`/coins/${row.original.id}`}
                className="font-semibold"
              >
                {name}{" "}
                <span className="ml-2 font-normal text-muted-foreground">
                  {symbol.toUpperCase()}
                </span>
              </Link>
            </div>
          );
        },
        enableHiding: false
      },
      {
        id: "Price",
        accessorKey: "current_price",
        header: "Price",
        cell: ({ cell }) => formatPrice(cell.getValue() as number),
      },
      {
        id: "Price change in 1h",
        accessorKey: "price_change_percentage_1h_in_currency",
        header: "1h",
        cell: ({ cell }) => {
          const value = Number(cell.getValue());

          return (
            <span
              className={cn({
                "text-green": value > 0,
                "text-destructive": value < 0,
              })}
            >
              {formatPercentage(value)}
            </span>
          );
        },
      },
      {
        id: "Price change in 24h",
        accessorKey: "price_change_percentage_24h_in_currency",
        header: "24h",
        cell: ({ cell }) => {
          const value = Number(cell.getValue());

          return (
            <span
              className={cn({
                "text-green": value > 0,
                "text-destructive": value < 0,
              })}
            >
              {formatPercentage(value)}
            </span>
          );
        },
      },
      {
        id: "Price change in 7d",
        accessorKey: "price_change_percentage_7d_in_currency",
        header: "7d",
        cell: ({ cell }) => {
          const value = Number(cell.getValue());

          return (
            <span
              className={cn({
                "text-green": value > 0,
                "text-destructive": value < 0,
              })}
            >
              {formatPercentage(value)}
            </span>
          );
        },
      },
      {
        id: "Market cap",
        accessorKey: "market_cap",
        header: "Market cap",
        cell: ({ cell }) => formatPrice(cell.getValue() as number),
      },
      {
        id: "Sparkline",
        accessorKey: "sparkline_in_7d",
        header: "Last 7 days",
        cell: ({ cell, row }) => (
          <Link href={`/coins/${row.original.id}?period=7d`}>
            <Sparklines
              data={(cell.getValue() as { price: number[] }).price}
              width={150}
              height={50}
            >
              <SparklinesLine
                style={{ fill: "none" }}
                color={
                  Number(
                    row.getValue("Price change in 7d")
                  ) > 0
                    ? "green"
                    : "red"
                }
              />
            </Sparklines>
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      // searchableColumns={[
      //   {
      //     id: "name",
      //     title: "names",
      //   },
      // ]}
    />
  );
}
