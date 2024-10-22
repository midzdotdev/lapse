import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lapse App",
  description: "Focus on what matters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 font-sans text-black antialiased dark:bg-neutral-950 dark:text-neutral-50">
        {children}
      </body>
    </html>
  );
}
