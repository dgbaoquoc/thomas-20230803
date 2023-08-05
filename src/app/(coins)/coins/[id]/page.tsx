import { getCoin, getCoinMarketChart } from "@/app/_actions/coin";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { Shell } from "@/components/shells/shell";
import Container from "@/components/ui/container";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CoinHeader from "./_components/header";
import { tabs } from "@/constants";
import OverviewContent from "./_components/overview-content";

// TODO: change to dynamic
export const metadata: Metadata = {
  title: "Coin",
  description: "Coin description ...",
};

interface CoinPageProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function CoinPage({
  params,
  searchParams,
}: CoinPageProps) {
  const { period } = searchParams;

  const coin = await getCoin(params.id);

  if (!coin) notFound();

  // chart data
  const days = typeof period === "string" ? Number(period.replace("d", "")) : 1;
  const coinMarketPrices = await getCoinMarketChart({
    id: coin.id,
    days,
  });

  return (
    <Shell>
      <Container>
        <Breadcrumbs
          segments={[
            {
              title: "Coins",
              href: "/",
            },
            {
              title: coin.name,
            },
          ]}
        />
        <div className="flex flex-col gap-8 md:gap-16">
          <CoinHeader coin={coin} />
          <Tabs defaultValue="overview" className="w-full overflow-x-auto">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.title} value={tab.value}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="overview">
              <OverviewContent
                coin={coin}
                coinMarketPrices={coinMarketPrices ?? []}
              />
            </TabsContent>
            <TabsContent value="market">Market</TabsContent>
            <TabsContent value="about">About</TabsContent>
          </Tabs>
        </div>
      </Container>
    </Shell>
  );
}
