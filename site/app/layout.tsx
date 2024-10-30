import "@/styles/globals.css";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Lapse App",
  description: "Focus on what matters",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="animate-rise">
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
