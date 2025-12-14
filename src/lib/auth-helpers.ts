// src/lib/auth-helpers.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return {
    authorized: true,
    session,
    userId: session.user.id,
  };
}

export async function requireOnboarding() {
  const authCheck = await requireAuth();

  if (!authCheck.authorized) {
    return authCheck;
  }

  // Check if user completed onboarding
  const user = await prisma.user.findUnique({
    where: { id: authCheck.userId },
    select: { onboardingCompleted: true },
  });

  if (!user?.onboardingCompleted) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Onboarding required" },
        { status: 403 }
      ),
    };
  }

  return authCheck;
}
