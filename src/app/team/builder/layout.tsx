import { SiteHeader } from "@/components/site-header";

export default function TeamBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader pageName="팀 생성/수정" />
      {children}
    </>
  );
}
