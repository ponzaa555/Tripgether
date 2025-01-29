import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import "@/src/app/globals.css";
import SessionProvider from "@/src/components/next-auth/SessionProvider";
import { getServerSession } from "next-auth";
import { ModalProvider } from "@/src/context/ModalContext";
import MynavBar from "@/src/components/UI/MyNavbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "@/src/components/UI/sonner";
import { ConvexClientProvider } from "./ConvexClientProvider";
import LoginModal from "@/src/components/login/LoginModal";
import authOption from "../lib/backend/authOption";

const mitr = Mitr({
  weight: "300",
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "TripGether",
  description: "Travel together with TripGether",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOption);

  // Check if the current path matches any in noNavbarPaths
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <SessionProvider session={session}>
        <body className={mitr.className}>
          <ConvexClientProvider>
            <ModalProvider>
              <TooltipProvider>
                <MynavBar />
                <div>{children}</div>
                <LoginModal />
              </TooltipProvider>
              <Toaster richColors />
            </ModalProvider>
          </ConvexClientProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
