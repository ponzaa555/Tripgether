import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/next-auth/SessionProvider";
import { getServerSession } from "next-auth";
import MynavBar from "@/components/ui/MyNavbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const mitr = Mitr({
  weight: "300",
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "TripGether",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <SessionProvider session={session}>
        <body className={mitr.className}>
          <TooltipProvider>
            <MynavBar />
            <div className="pt-14">{children}</div>
          </TooltipProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
