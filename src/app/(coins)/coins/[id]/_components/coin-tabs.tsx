import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CoinTab } from "@/types/coin";

import OverviewContent from "./overview-content";

interface CoinTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  defaultvalue: CoinTab["value"];
}

export default function CoinTabs({ className, ...props }: CoinTabsProps) {
  const tabs: CoinTab[] = [
    {
      title: "Overview",
      value: "overview",
    },
    {
      title: "Market",
      value: "market",
    },
    {
      title: "About",
      value: "about",
    },
  ];

  return (
    <Tabs {...props} className={cn("w-full overflow-x-auto", className)}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.title} value={tab.value}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="overview">
        <OverviewContent />
      </TabsContent>
      <TabsContent value="market">Market</TabsContent>
      <TabsContent value="about">About</TabsContent>
    </Tabs>
  );
}
