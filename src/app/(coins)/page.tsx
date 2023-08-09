import { Header } from "@/components/header";
import CoinsTableShell from "@/components/shells/coins-table-shell";
import { Shell } from "@/components/shells/shell";
import Container from "@/components/ui/container";
import { type Metadata } from "next";
import { getCoins, getGlobal } from "@/app/_actions/coin";
import { cn, formatPercentage, formatPrice } from "@/lib/utils";

export const dynamic = 'force-dynamic'; // SSR

export const metadata: Metadata = {
  title: "Coins",
  description: "Search for your looking coin in the market.",
};

interface CoinsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function CoinsPage({ searchParams }: CoinsPageProps) {
  const { page, per_page, sort } = searchParams;
  // Number of items per page
  const limit = typeof per_page === "string" ? parseInt(per_page) : 100;

  const { total, coins } = await getCoins({
    per_page: limit,
    page: typeof page === "string" ? Number(page) : 1,
        order : "market_cap_desc",
      vs_currency : "usd",
      locale : "en",
      sparkline : true,
      price_change_percentage : "1h,24h,7d",
      precision : "2",
  });
  const pageCount = Math.ceil(total / limit);

  const global = await getGlobal();

  return (
    <Shell>
      <Container>
        <Header
          title="Cryptocurrency Prices by Market Cap"
          description={
            <>
              <p className="line-clamp-2 text-muted-foreground">
                The global crypto market cap is {formatPrice(global.total_market_cap.usd, "USD", "compact")}, a 
                <span 
                className={cn({
                  "text-destructive": global.market_cap_change_percentage_24h_usd < 0,
                  "text-green": global.market_cap_change_percentage_24h_usd > 0,
                })}
                > {formatPercentage(global.market_cap_change_percentage_24h_usd)} {
                  global.market_cap_change_percentage_24h_usd > 0 ? "increase" : "decrease"
                }</span> over the last day
              </p>
            </>
          }
          size="sm"
        />
        <CoinsTableShell data={coins} pageCount={pageCount} />
      </Container>
    </Shell>
  );
}
