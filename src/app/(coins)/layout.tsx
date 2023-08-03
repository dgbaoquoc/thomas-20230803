import Navbar from "@/components/layouts/navbar";

interface CoinsLayoutProps {
  children: React.ReactNode;
}

export default function CoinsLayout({ children }: CoinsLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
