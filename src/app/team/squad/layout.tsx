import { SiteHeader } from "@/components/site-header";

export default function TeamSquadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader pageName="스쿼드 생성" />
      {children}
    </>
  );
}
