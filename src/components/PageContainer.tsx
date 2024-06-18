import type { PropsWithChildren } from "react";

type PageContainerProps = PropsWithChildren;

export default function PageContainer({ children }: PageContainerProps) {
  return <main className="container mx-auto px-3">{children}</main>;
}
