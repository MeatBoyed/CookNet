import { getServerSession } from "next-auth";
import "./globals.css";
import SessionProvider from "~/utils/SessionProvider";
import { authOptions } from "~/server/auth";
import Navbar from "~/utils/components/Navbar";
import Footer from "~/utils/components/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col items-center justify-center">
          <SessionProvider session={session}>
            <Navbar />
            {children}
            <Footer />
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
