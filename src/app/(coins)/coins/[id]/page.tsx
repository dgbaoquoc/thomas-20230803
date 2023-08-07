import {
  getCoin,
  getCoinMarketChart,
  getCoinMartChartOhlc,
} from "@/app/_actions/coin";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { Shell } from "@/components/shells/shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { LoremIpsum, loremIpsum } from "lorem-ipsum";
import { tabs } from "@/constants";
import CoinHeader from "./_components/header";
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

  const coinMarketPricesOhlc = await getCoinMartChartOhlc({
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
        <div className="flex flex-col gap-4 md:gap-8">
          <CoinHeader coin={coin} />
          <Tabs defaultValue="overview">
            <TabsList className="inline-flex h-9 items-center w-full justify-start rounded-none border-b bg-transparent p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.title}
                  value={tab.value}
                  disabled={tab.disabled}
                  className="data-[state=active]:bg-gray-100 data-[state=active]:text-foreground data-[state=active]:font-semibold"
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="overview">
              <OverviewContent
                coin={coin}
                coinMarketPrices={coinMarketPrices ?? []}
                coinMarketPricesOhlc={coinMarketPricesOhlc ?? []}
              />
            </TabsContent>
            <TabsContent value="market">Market</TabsContent>
            <TabsContent value="about">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    What is {coin.name} ({coin.symbol})?
                  </AccordionTrigger>
                  <AccordionContent>
                    {new LoremIpsum().generateParagraphs(1)}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Who is founder of {coin.name}?
                  </AccordionTrigger>
                  <AccordionContent>
                    {new LoremIpsum().generateParagraphs(2)}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </Shell>
  );
}
