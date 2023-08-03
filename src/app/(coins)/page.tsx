import { Header } from "@/components/header";
import { Shell } from "@/components/shells/shell";
import Container from "@/components/ui/container";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Rakkar | Coins",
  description: "Search for your looking coin in the market.",
};

export default function CoinsPage() {
  return (
    <Shell>
      <Container>
        <Header
          title="Cryptocurrency Prices by Market Cap"
          description="The global cryptocurrency market cap today ..."
          size="sm"
        />
      </Container>
    </Shell>
  );
}
