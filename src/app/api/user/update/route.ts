import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      gender: body.gender,
      interests: body.interests,
      profileDone: true,
    },
  });

  return Response.json(user);
}
