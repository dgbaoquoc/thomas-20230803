import { Header } from "@/components/header";
import CoinsTableShell from "@/components/shells/coins-table-shell";
import { Shell } from "@/components/shells/shell";
import Container from "@/components/ui/container";
import { type Metadata } from "next";
import { getCoins } from "@/app/_actions/coin";

export const metadata: Metadata = {
  title: "Rakkar | Coins",
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
    page: typeof page === "string"
    ? Number(page) : 1,
  });
  const pageCount = Math.ceil(total / limit);

  return (
    <Shell>
      <Container>
        <Header
          title="Cryptocurrency Prices by Market Cap"
          description="The global cryptocurrency market cap today ..."
          size="sm"
        />
        <CoinsTableShell data={coins} pageCount={pageCount} />
      </Container>
    </Shell>
  );
}
