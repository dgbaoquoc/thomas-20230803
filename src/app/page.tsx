import { Button } from "@/components/ui/button";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Rakkar | Coins",
  description: "Search for your looking coin in the market.",
};
export default function Home() {
  return (
    <main>
      <Button>Hello world</Button>
    </main>
  );
}
