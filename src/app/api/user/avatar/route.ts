import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { imageUrl } = await req.json().catch(() => ({}));
  if (!imageUrl || typeof imageUrl !== "string")
    return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { avatarImage: imageUrl },
    select: { id: true, avatarImage: true },
  });

  return NextResponse.json(user);
}

export async function GET(req: Request) {
  // optional: return current user's avatar (for client sync/rollback)
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ image: null });
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { avatarImage: true },
  });
  return NextResponse.json(user ?? { image: null });
}
