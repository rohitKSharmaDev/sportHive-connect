"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { AvatarProvider } from "./AvatarProvider";

export function SessionProviderClient({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <AvatarProvider>
        {children}
      </AvatarProvider>
    </SessionProvider>
  );
}
