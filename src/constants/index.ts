import { CoinTab } from "@/types/coin";

export const tabs: CoinTab[] = [
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

export const sortOptions = [
    {
        title: "1d",
        value: "1d",
      },
      {
        title: "7d",
        value: "7d",
      },
      {
        title: "30d",
        value: "30d",
      },
      // Cannot filter too much
      // {
      //   title: "All",
      //   value: "all",
      // }
]