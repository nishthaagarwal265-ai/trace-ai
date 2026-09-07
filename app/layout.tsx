import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "TRACE-AI | Digital Forensics Platform",
  description: "AI-Powered Deepfake Detection & Digital Forensics Platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0A0D12] text-[#E7ECF2]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
