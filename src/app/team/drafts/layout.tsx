import { SiteHeader } from "@/components/site-header";

export default function TeamSquadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader pageName="저장된 팀" />
      {children}
    </>
  );
}
