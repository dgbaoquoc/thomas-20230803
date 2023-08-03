import { SiteHeader } from "@/components/layouts/site-header";

interface CoinsLayoutProps {
  children: React.ReactNode;
}

export default function CoinsLayout({ children }: CoinsLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main>{children}</main>
    </div>
  );
}
