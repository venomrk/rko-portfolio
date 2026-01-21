import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RKO | Portfolio",
  description: "Epic 3D Interactive Portfolio showcasing innovative projects by RKO",
  keywords: ["RKO", "Portfolio", "Developer", "GitHub", "Projects"],
  authors: [{ name: "O Rakshith Kumar" }],
  openGraph: {
    title: "RKO | Portfolio",
    description: "Epic 3D Interactive Portfolio showcasing innovative projects by RKO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
