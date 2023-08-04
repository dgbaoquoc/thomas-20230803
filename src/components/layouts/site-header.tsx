import { Icons } from "@/components/icons";
import Container from "@/components/ui/container";
import dynamic from "next/dynamic";
import Link from "next/link";

const NavbarActionsClient = dynamic(() => import('@/components/navbar-actions'), { ssr: false })

export function SiteHeader() {
  return (
    <header className="border-b">
      <Container>
        <div className="relative flex h-16 items-center">
          <Link href="/">
            <Icons.logo className="h-6 w-auto" aria-hidden="true" />
          </Link>
          <div className="ml-auto flex items-center gap-x-10">
            <NavbarActionsClient />
          </div>
        </div>
      </Container>
    </header>
  );
}
