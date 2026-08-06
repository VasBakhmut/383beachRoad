import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Nav from "@/components/Nav";
import FloorProgressRail from "@/components/FloorProgressRail";

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "383B Beach Road, Beaumaris",
  description:
    "Four levels of magnificent beachfront living on Port Phillip Bay. 4 bed · 4 bath · 4+ car · 335m² · rooftop terrace with spa & BBQ. Private sale, inspection by appointment.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-fg">
        <SmoothScrollProvider>
          <Nav />
          <FloorProgressRail />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
