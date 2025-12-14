import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";

export async function POST(req: Request) {
  try {
    const authCheck = await requireAuth();

    if (!authCheck.authorized) {
      return authCheck.response;
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
      where: { id: authCheck.userId },
      data: {
        firstName,
        lastName,
        avatarImage,
        dob: new Date(dob),
        gender,
        sportsInterests,
        onboardingCompleted,
      },
    });

    return NextResponse.json(user);
    
  } catch (error) {
    console.error("Error updating user:", error);

    // ✅ Return proper error response
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const authCheck = await requireAuth();

    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const user = await prisma.user.findUnique({
      where: { id: authCheck.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        dob: true,
        gender: true,
        sportsInterests: true,
        avatarImage: true,
        onboardingCompleted: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user); 
  } catch (error) {
    console.error("Error fetching user:", error);

    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}