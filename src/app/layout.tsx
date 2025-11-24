import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
import Image from "next/image";
import logo from "../../public/logo-main.svg";
import { ProfileBadge } from "@/components/ProfileBadge";

export const metadata: Metadata = {
  title: "SportHive Connect",
  description: "Find. Join. Play together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = null;

  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-slate-50 text-slate-900")}>
        <div className="flex flex-col">
          <header className="border-b bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <Image
                  src={logo}
                  className={`md:w-[140px] w-[100px]`}
                  alt="SportHive Connect Logo"
                  loading="eager"
                />
              </div>

              {/* Right side: put auth/profile links later */}
              <nav className="flex items-center gap-4 text-sm">
                <ProfileBadge user={user} />
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
