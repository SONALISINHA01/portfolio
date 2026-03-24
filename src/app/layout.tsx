import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/SkipLink";
import IconSprite from "@/components/IconSprite";
import PageLoader from "@/components/PageLoader";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sonali-portfolio.vercel.app"),
  title: "Sonali | ML Engineer & Software Developer",
  description:
    "Portfolio of Sonali — Machine Learning Engineer | Systems Programmer | Problem Solver. 550+ DSA problems solved. Building production-grade ML systems.",
  keywords: [
    "Machine Learning Engineer",
    "Software Developer",
    "Python",
    "XGBoost",
    "Systems Programming",
    "Portfolio",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Sonali | ML Engineer & Software Developer",
    description:
      "ML Engineer & Systems Programmer — Building production-grade ML systems with 550+ DSA problems solved.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonali | ML Engineer & Software Developer",
    description:
      "ML Engineer & Systems Programmer — Building production-grade ML systems with 550+ DSA problems solved.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="antialiased" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <ToastProvider>
          <PageLoader />
          <SkipLink />
          <IconSprite />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
