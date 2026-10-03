import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
        <header className="border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="flex items-center gap-3 font-semibold tracking-tight"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-lg text-white">
                ☕
              </span>

              <span className="text-lg">
                Coffee Tracker
              </span>
            </Link>

            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                Beans
              </Link>

              <Link
                href="/beans/new"
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-white transition hover:bg-[var(--accent-hover)]"
              >
                + Add bean
              </Link>
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