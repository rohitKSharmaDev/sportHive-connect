import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      onboardingCompleted: boolean;
    };
  }

  interface JWT {
    id: string;
    email: string;
    onboardingCompleted: boolean;
    avatarImage?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  }
}
