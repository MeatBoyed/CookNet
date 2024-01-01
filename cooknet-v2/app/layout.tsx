import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";
import { EdgeStoreProvider } from "@/lib/edgstore";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "CookNet",
  description: "Just Do it - CookNet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      afterSignUpUrl="/onboarding"
      afterSignInUrl="/onboarding"
    >
      <html lang="en">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <EdgeStoreProvider>
            <body
              className={cn(
                "min-h-screen bg-background font-sans antialiased tracking-wider",
                inter.variable
              )}
            >
              <Navbar />
              <main className="flex min-h-screen flex-col items-center justify-between p-10">
                {children}
              </main>
              <Footer />
            </body>
          </EdgeStoreProvider>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
