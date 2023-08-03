import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import { Icons } from "../icons";
import NavbarActions from "../navbar-actions";

export function SiteHeader() {
  return (
    <header className="border-b">
      <Container>
        <div className="relative flex h-16 items-center">
          <Link href="/">
            <Icons.logo className="h-6 w-auto" aria-hidden="true" />
          </Link>
          <div className="ml-auto flex items-center gap-x-10">
            <NavbarActions />
            {/* <NavbarActions /> */}
          </div>
        </div>
      </Container>
    </header>
  );
}
