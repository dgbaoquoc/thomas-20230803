import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { cn, formatPercentage, formatPrice } from "@/lib/utils";
import { Coin } from "@/types/coin";
import Image from "next/image";

interface CoinHeaderProps {
  coin: Coin;
}

export default function CoinHeader({ coin }: CoinHeaderProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <div>
        <Badge>Rank #{coin.market_cap_rank}</Badge>
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="relative h-6 w-6">
          {coin.image === "missing_large.png" ? (
            <Icons.coin className="h-6 w-6" />
          ) : (
            <Image
              fill
              src={coin.image}
              alt={coin.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <h1 className="line-clamp-1 text-2xl font-bold tracking-tight">
          {coin.name}
        </h1>
        <span className="text-sm font-normal text-muted-foreground">
          {coin.symbol.toUpperCase()}
        </span>
      </div>
      <div className="flex gap-x-2 items-center">
        <h2 className="line-clamp-1 text-3xl font-bold tracking-tight">
          {formatPrice(coin.market_data.current_price.usd)}
        </h2>

        {/* TODO: based on period filter */}
        <span
          className={cn("text-base flex gap-x-0 items-center", {
            "text-green": coin.market_data.price_change_percentage_24h > 0,
            "text-destructive":
              coin.market_data.price_change_percentage_24h < 0,
          })}
        >
          {coin.market_data.price_change_percentage_24h < 0 ? (
            <Icons.chevronDown className="h-4 w-4" />
          ) : (
            <Icons.chevronUp className="h-4 w-4" />
          )}

          {formatPercentage(coin.market_data.price_change_percentage_24h)}
        </span>
      </div>
    </div>
  );
}
