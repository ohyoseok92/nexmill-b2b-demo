import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "NEXMILL | 산업용 정밀 부품", template: "%s | NEXMILL" },
  description: "가상 제조기업 NEXMILL의 반응형 회사·제품 소개 및 문의 접수 데모입니다.",
  metadataBase: new URL("https://nexmill-industrial-demo.oh6428.chatgpt.site"),
  robots: { index: true, follow: true },
  openGraph: { title: "NEXMILL | 산업용 정밀 부품", description: "가상 제조기업의 웹사이트 제작 포트폴리오 데모", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body><SiteHeader />{children}<SiteFooter /></body></html>; }
