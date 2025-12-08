// src/app/api/user/onboarding/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { onboardingCompleted: true },
    select: { id: true, onboardingCompleted: true },
  });

  return NextResponse.json({ success: true, user });
}

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { onboardingCompleted: true },
  });

  return NextResponse.json({ completed: user?.onboardingCompleted ?? false });
}
