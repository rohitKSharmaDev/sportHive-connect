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

  return (
    <html lang="en">
      <body className={cn("bg-slate-50 text-slate-900")}>
        <SessionProviderClient session={session}>
          <header className="border-b bg-white/80 backdrop-blur fixed top-0 w-full">
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

              {/* Right side: put auth/profile links later */}
              <nav className="flex items-center gap-4 text-sm">
                <ProfileBadge />
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>
          <Toaster />
        </SessionProviderClient>
      </body>
    </html>
  );
}
