import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coffee Tracker",
  description: "Track your beans and dial in your brews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-[#ded5c8] bg-[#f6f1e9]">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link href="/" className="text-xl font-bold text-[#3b2a1d]">
              Coffee Tracker ☕️
            </Link>

            <nav className="flex items-center gap-6 text-sm">
              <Link href="/">Beans</Link>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6">
          {children}
        </div>
      </body>
    </html>
  );
}