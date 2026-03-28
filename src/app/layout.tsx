import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "airVenue.ai | Discover Your Perfect Event Space",
  description: "Find and book stunning venues for your next event with airVenue.ai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${poppins.variable} h-full antialiased font-sans`}
      >
        <body className="min-h-full flex flex-col font-sans">{children}</body>
      </html>
    </ClerkProvider>
  );
}
