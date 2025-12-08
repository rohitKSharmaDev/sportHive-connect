import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { SessionProviderClient } from "./providers/SessionProviderClient";


import Image from "next/image";
import logo from "../../public/logo-main.svg";
import { ProfileBadge } from "@/components/ProfileBadge";
import Link from "next/link";
import { Toaster } from "sonner";
import { BottomNav } from "@/components/navigation/BottomNav";
import { prisma } from "lib/prisma";


export const metadata: Metadata = {
  title: "SportHive Connect",
  description: "Find. Join. Play together.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log({ session })

  let showBottomNav = false;
  
  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { onboardingCompleted: true }
    });
    showBottomNav = user?.onboardingCompleted ?? false;
  }

  return (
    <html lang="en">
      <body className={cn("bg-slate-50 text-slate-900")}>
        <SessionProviderClient session={session}>
          <header className="border-b bg-white/80 backdrop-blur fixed top-0 w-full z-50">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Image
                    src={logo}
                    className={`md:w-[140px] w-[100px] cursor-pointer`}
                    alt="SportHive Connect Logo"
                    loading="eager"
                  />
                </Link>
              </div>

              <div className="hidden md:block">
                <nav className="flex items-center gap-4 text-sm">
                  <ProfileBadge />
                </nav>
              </div>
            </div>
          </header>

          <main className="flex-1 mt-15">{children}</main>
          <Toaster />
          
          {showBottomNav && (
            <div className="block md:hidden">
              <BottomNav />
            </div>
          )}
        </SessionProviderClient>
      </body>
    </html>
  );
}
