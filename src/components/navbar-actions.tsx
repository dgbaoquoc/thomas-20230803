"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/use-debounce";
import { cn, isMacOs } from "@/lib/utils";
import {
  QuerySearchResult,
  getSearchCoins,
  getTrendingCoins,
} from "@/app/_actions/coin";
import { TrendingCoin } from "@/types/coin";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NavbarActions() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [data, setData] = React.useState<QuerySearchResult | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const [trendingCoins, setTrendingCoins] = React.useState<TrendingCoin[]>([]);

  React.useEffect(() => {
    if (debouncedQuery.length === 0) setData(null);

    if (debouncedQuery.length > 0) {
      startTransition(async () => {
        const data = await getSearchCoins(debouncedQuery);
        setData(data);
      });
    }
  }, [debouncedQuery]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setIsOpen(false);
    callback();
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  React.useEffect(() => {
    (async () => {
      const coins = await getTrendingCoins();
      if (coins.length > 0) setTrendingCoins(coins);
    })();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="outline"
          className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
          onClick={() => setIsOpen(true)}
        >
          <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
          <span className="hidden xl:inline-flex">Search coins...</span>
          <span className="sr-only">Search coins</span>
          <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
            <abbr title={isMacOs() ? "Command" : "Control"}>
              {isMacOs() ? "⌘" : "Ctrl+"}
            </abbr>
            K
          </kbd>
        </Button>
      </motion.div>
      <CommandDialog position="top" open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Search coins..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            No coins found.
          </CommandEmpty>
          {!query && (
            <CommandGroup key="trending" heading="Trending Search">
              {trendingCoins.map((coin) => (
                <CommandItem
                  key={coin.id}
                  onSelect={() =>
                    handleSelect(() => router.push(`/coins/${coin.id}`))
                  }
                  className="flex justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative h-6 w-6">
                      <Image
                        fill
                        src={coin.thumb}
                        alt={coin.name}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <span>{coin.name}</span>
                    <span className="text-sm">({coin.symbol})</span>
                  </div>
                  <div>#{coin.market_cap_rank}</div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map((group) => (
              <CommandGroup
                key={group.category}
                heading={group.category}
                className="capitalize"
              >
                {group[group.category]?.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() =>
                      handleSelect(() => router.push(`/coins/${item.id}`))
                    }
                  >
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
