import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sonali | ML Engineer & Software Developer",
  description:
    "Portfolio of Sonali — Machine Learning Engineer | Systems Programmer | Problem Solver. 500+ DSA problems solved. Building production-grade ML systems.",
  keywords: [
    "Machine Learning Engineer",
    "Software Developer",
    "Python",
    "XGBoost",
    "Systems Programming",
    "Portfolio",
  ],
  openGraph: {
    title: "Sonali | ML Engineer & Software Developer",
    description:
      "ML Engineer & Systems Programmer — Building production-grade ML systems with 500+ DSA problems solved.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
