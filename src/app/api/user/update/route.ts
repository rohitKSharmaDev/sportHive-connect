import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const {
    firstName,
    lastName,
    dob,
    gender,
    sportsInterests,
    avatarImage,
    onboardingCompleted,
  } = body;


  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName,
      lastName,
      avatarImage,
      dob: new Date(dob),
      gender,
      sportsInterests,
      onboardingCompleted: onboardingCompleted ?? true,
      profileDone: true,
    },
  });

  return Response.json(user);
}
