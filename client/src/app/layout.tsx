import { getServerSession } from "next-auth";
import "./globals.css";
import SessionProvider from "~/utils/SessionProvider";
import { authOptions } from "~/server/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
