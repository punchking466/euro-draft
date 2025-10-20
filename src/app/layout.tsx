import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ModalProvider } from "@/contexts/ModalContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Euro Draft",
  description: "팀 자동 생성 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ModalProvider>
          <LoadingProvider>
            <Toaster />
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                  "--main-content-height":
                    "calc(100lvh - var(--header-height) - 58px)",
                } as React.CSSProperties
              }
            >
              <AppSidebar />
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          </LoadingProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
