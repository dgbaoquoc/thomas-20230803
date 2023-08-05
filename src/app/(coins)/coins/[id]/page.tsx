import { getCoin } from "@/app/_actions/coin";
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
}

export default async function CoinPage({ params }: CoinPageProps) {
  const coin = await getCoin(params.id);

  if (!coin) notFound();

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
              <OverviewContent coin={coin} />
            </TabsContent>
            <TabsContent value="market">Market</TabsContent>
            <TabsContent value="about">About</TabsContent>
          </Tabs>
        </div>
      </Container>
    </Shell>
  );
}
