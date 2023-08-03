import * as React from "react";

import { cn } from "@/lib/utils";

interface ShellProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
}

export function Shell({
  children,
  className,
  ...props
}: ShellProps) {
  return (
    <section
      className={cn("grid gap-8 pb-8 pt-6 md:py-8", className)}
      {...props}
    >
      {children}
    </section>
  );
}
